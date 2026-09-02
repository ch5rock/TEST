import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { inspirations } from "@/db/schema";
import { userFromHeaders } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!userFromHeaders(request.headers)) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const { id } = await params;
  const db = getDb();
  const [item] = await db.select({ key: inspirations.mediaKey, name: inspirations.mediaName, type: inspirations.mediaType }).from(inspirations).where(eq(inspirations.id, id)).limit(1);
  if (!item?.key) return Response.json({ error: "파일을 찾을 수 없습니다." }, { status: 404 });
  const object = await env.BUCKET.get(item.key);
  if (!object) return Response.json({ error: "파일을 찾을 수 없습니다." }, { status: 404 });
  const safeName = (item.name ?? "download").replace(/["\r\n]/g, "_");
  return new Response(object.body, { headers: { "Content-Type": item.type ?? "application/octet-stream", "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(safeName)}`, "Cache-Control": "private, max-age=300" } });
}
