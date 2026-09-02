import { getDb } from "@/db";
import { projectMembers, projects } from "@/db/schema";
import { userFromHeaders } from "@/lib/auth";
import { ensureUser } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const user = userFromHeaders(request.headers);
    if (!user) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
    const payload = await request.json() as { inspirationId?: string; title?: string; description?: string; rolesNeeded?: string[] };
    const inspirationId = payload.inspirationId?.trim() ?? "";
    const title = payload.title?.trim() ?? "";
    const description = payload.description?.trim() ?? "";
    const roles = (payload.rolesNeeded ?? []).map((role) => role.trim()).filter(Boolean).slice(0, 8);
    if (!inspirationId || !title || !description || !roles.length) return Response.json({ error: "프로젝트 정보와 필요한 역할을 모두 입력해주세요." }, { status: 400 });
    await ensureUser(user);
    const id = crypto.randomUUID();
    const db = getDb();
    const [created] = await db.insert(projects).values({ id, inspirationId, ownerId: user.id, ownerName: user.name, title: title.slice(0, 100), description: description.slice(0, 1000), rolesNeeded: JSON.stringify(roles) }).returning();
    await db.insert(projectMembers).values({ projectId: id, userId: user.id, userName: user.name, role: "기획자", status: "accepted" });
    return Response.json({ project: created }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "프로젝트를 만들지 못했습니다." }, { status: 500 });
  }
}
