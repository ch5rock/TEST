import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { saves } from "@/db/schema";
import { userFromHeaders } from "@/lib/auth";
import { ensureUser } from "@/lib/data";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = userFromHeaders(request.headers);
  if (!user) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const { id } = await params;
  const db = getDb();
  await ensureUser(user);
  const [existing] = await db.select().from(saves).where(and(eq(saves.userId, user.id), eq(saves.inspirationId, id))).limit(1);
  if (existing) {
    await db.delete(saves).where(and(eq(saves.userId, user.id), eq(saves.inspirationId, id)));
    return Response.json({ saved: false });
  }
  await db.insert(saves).values({ userId: user.id, inspirationId: id });
  return Response.json({ saved: true });
}
