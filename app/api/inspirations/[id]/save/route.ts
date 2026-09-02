import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { saves } from "@/db/schema";
import { userForRequest, withGuestCookie } from "@/lib/auth";
import { ensureUser } from "@/lib/data";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, guestCookie } = userForRequest(request);
  const { id } = await params;
  const db = getDb();
  await ensureUser(user);
  const [existing] = await db.select().from(saves).where(and(eq(saves.userId, user.id), eq(saves.inspirationId, id))).limit(1);
  if (existing) {
    await db.delete(saves).where(and(eq(saves.userId, user.id), eq(saves.inspirationId, id)));
    return withGuestCookie(Response.json({ saved: false }), guestCookie);
  }
  await db.insert(saves).values({ userId: user.id, inspirationId: id });
  return withGuestCookie(Response.json({ saved: true }), guestCookie);
}
