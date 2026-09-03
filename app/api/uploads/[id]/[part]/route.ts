import { env } from "cloudflare:workers";
import { userForRequest, withGuestCookie } from "@/lib/auth";

const maxChunkSize = 800 * 1024;

export async function PUT(request: Request, { params }: { params: Promise<{ id: string; part: string }> }) {
  try {
    const { id, part } = await params;
    const partNumber = Number(part);
    if (!/^[0-9a-f-]{36}$/i.test(id) || !Number.isInteger(partNumber) || partNumber < 0 || partNumber >= 40) {
      return Response.json({ error: "잘못된 업로드 요청입니다." }, { status: 400 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > maxChunkSize) return Response.json({ error: "파일 조각이 너무 큽니다." }, { status: 413 });

    const { user, guestCookie } = userForRequest(request);
    const bytes = await request.arrayBuffer();
    if (!bytes.byteLength || bytes.byteLength > maxChunkSize) return Response.json({ error: "파일 조각 크기가 올바르지 않습니다." }, { status: 400 });

    await env.BUCKET.put(`chunked/${user.id}/${id}/${partNumber}`, bytes);
    return withGuestCookie(Response.json({ uploaded: true, part: partNumber }), guestCookie);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "파일을 업로드하지 못했습니다." }, { status: 500 });
  }
}
