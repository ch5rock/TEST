import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { inspirations } from "@/db/schema";
import { userForRequest, withGuestCookie } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, guestCookie } = userForRequest(request);
  const { id } = await params;
  const db = getDb();
  const [item] = await db.select({ key: inspirations.mediaKey, name: inspirations.mediaName, type: inspirations.mediaType, ownerId: inspirations.ownerId }).from(inspirations).where(eq(inspirations.id, id)).limit(1);
  if (!item?.key) return Response.json({ error: "파일을 찾을 수 없습니다." }, { status: 404 });
  if (item.ownerId !== user.id) return Response.json({ error: "업로드한 FOOTER만 원본 파일을 받을 수 있습니다." }, { status: 403 });

  let body: ReadableStream;
  if (item.key.startsWith("chunked/")) {
    const segments = item.key.split("/");
    const count = Number(segments.pop());
    const baseKey = segments.join("/");
    if (!Number.isInteger(count) || count < 1 || count > 40) return Response.json({ error: "파일 정보가 올바르지 않습니다." }, { status: 500 });
    body = streamChunks(baseKey, count);
  } else {
    const object = await env.BUCKET.get(item.key);
    if (!object) return Response.json({ error: "파일을 찾을 수 없습니다." }, { status: 404 });
    body = object.body;
  }

  const safeName = (item.name ?? "download").replace(/["\r\n]/g, "_");
  return withGuestCookie(new Response(body, { headers: { "Content-Type": item.type ?? "application/octet-stream", "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(safeName)}`, "Cache-Control": "private, max-age=300" } }), guestCookie);
}

function streamChunks(baseKey: string, count: number) {
  let index = 0;
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      while (index < count || reader) {
        if (!reader) {
          const object = await env.BUCKET.get(`${baseKey}/${index}`);
          if (!object) {
            controller.error(new Error("파일 조각을 찾을 수 없습니다."));
            return;
          }
          reader = object.body.getReader();
          index += 1;
        }

        const result = await reader.read();
        if (result.done) {
          reader = null;
          continue;
        }
        controller.enqueue(result.value);
        return;
      }
      controller.close();
    },
    async cancel() {
      await reader?.cancel();
    },
  });
}
