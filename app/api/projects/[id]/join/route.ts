import { getDb } from "@/db";
import { projectMembers } from "@/db/schema";
import { userForRequest, withGuestCookie } from "@/lib/auth";
import { ensureUser } from "@/lib/data";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, guestCookie } = userForRequest(request);
  const { id } = await params;
  const payload = await request.json() as { role?: string };
  const role = payload.role?.trim().slice(0, 80);
  if (!role) return Response.json({ error: "참여 역할을 선택해주세요." }, { status: 400 });
  await ensureUser(user);
  const db = getDb();
  await db.insert(projectMembers).values({ projectId: id, userId: user.id, userName: user.name, role, status: "pending" }).onConflictDoUpdate({ target: [projectMembers.projectId, projectMembers.userId], set: { role, status: "pending" } });
  return withGuestCookie(Response.json({ joined: true }), guestCookie);
}
