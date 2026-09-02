import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { inspirations } from "@/db/schema";
import { userForRequest, withGuestCookie } from "@/lib/auth";
import { ensureUser } from "@/lib/data";

const allowedTypes = new Set(["text", "image", "audio", "video", "design"]);
const allowedLicenses = new Set(["열람 전용", "개인 이용", "상업 이용", "2차 창작 허용", "독점 이용", "협업 전용"]);

export async function POST(request: Request) {
  try {
    const { user, guestCookie } = userForRequest(request);
    const form = await request.formData();
    const title = String(form.get("title") ?? "").trim();
    const summary = String(form.get("summary") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    const contentType = String(form.get("contentType") ?? "text");
    const licenseType = String(form.get("licenseType") ?? "협업 전용");
    const parentId = String(form.get("parentId") ?? "").trim() || null;
    const price = Math.max(0, Number(form.get("price") ?? 0) || 0);
    const tags = String(form.get("tags") ?? "").split(",").map((tag) => tag.trim().replace(/^#/, "")).filter(Boolean).slice(0, 8);
    const file = form.get("file");

    if (!title || !summary) return Response.json({ error: "제목과 짧은 소개를 입력해주세요." }, { status: 400 });
    if (title.length > 80 || summary.length > 240 || body.length > 5000) return Response.json({ error: "입력 가능한 글자 수를 초과했습니다." }, { status: 400 });
    if (!allowedTypes.has(contentType) || !allowedLicenses.has(licenseType)) return Response.json({ error: "허용되지 않는 형식 또는 이용 범위입니다." }, { status: 400 });
    if (file instanceof File && file.size > 25 * 1024 * 1024) return Response.json({ error: "파일은 25MB 이하만 올릴 수 있습니다." }, { status: 400 });

    const id = crypto.randomUUID();
    let mediaKey: string | null = null;
    let mediaName: string | null = null;
    let mediaType: string | null = null;
    if (file instanceof File && file.size > 0) {
      mediaKey = `${user.id}/${id}/${crypto.randomUUID()}`;
      mediaName = file.name.slice(0, 180);
      mediaType = file.type || "application/octet-stream";
      await env.BUCKET.put(mediaKey, file.stream(), { httpMetadata: { contentType: mediaType } });
    }

    await ensureUser(user);
    const db = getDb();
    const [created] = await db.insert(inspirations).values({
      id, ownerId: user.id, ownerName: user.name, title, summary, body, contentType, licenseType,
      price: Math.round(price), tags: JSON.stringify(tags), parentId, mediaKey, mediaName, mediaType,
    }).returning();

    return withGuestCookie(Response.json({ inspiration: created }, { status: 201 }), guestCookie);
  } catch (error) {
    const message = error instanceof Error ? error.message : "등록 중 오류가 발생했습니다.";
    return Response.json({ error: message }, { status: 500 });
  }
}
