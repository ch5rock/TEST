import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { inspirations, projectMembers, projects, saves, users } from "@/db/schema";
import type { CurrentUser, Inspiration, Project } from "@/lib/types";

function parseList(value: string | null | undefined) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function mapInspiration(row: typeof inspirations.$inferSelect & { saveCount?: number | null }): Inspiration {
  return { ...row, tags: parseList(row.tags), saveCount: Number(row.saveCount ?? 0) };
}

function mapProject(row: typeof projects.$inferSelect & { inspirationTitle?: string | null; memberCount?: number | null }): Project {
  return {
    ...row,
    inspirationTitle: row.inspirationTitle ?? undefined,
    rolesNeeded: parseList(row.rolesNeeded),
    memberCount: Number(row.memberCount ?? 0),
  };
}

export async function ensureUser(user: CurrentUser) {
  const db = getDb();
  await db
    .insert(users)
    .values({ id: user.id, email: user.email, displayName: user.name })
    .onConflictDoUpdate({
      target: users.id,
      set: { email: user.email, displayName: user.name },
    });
}

export async function listInspirations(filters?: { q?: string; type?: string; limit?: number }) {
  const db = getDb();
  const conditions = [];
  if (filters?.type && filters.type !== "all") conditions.push(eq(inspirations.contentType, filters.type));
  if (filters?.q) {
    const pattern = `%${filters.q}%`;
    conditions.push(or(like(inspirations.title, pattern), like(inspirations.summary, pattern), like(inspirations.tags, pattern))!);
  }

  const rows = await db
    .select({
      id: inspirations.id,
      ownerId: inspirations.ownerId,
      ownerName: inspirations.ownerName,
      title: inspirations.title,
      summary: inspirations.summary,
      body: inspirations.body,
      contentType: inspirations.contentType,
      licenseType: inspirations.licenseType,
      price: inspirations.price,
      tags: inspirations.tags,
      parentId: inspirations.parentId,
      mediaKey: inspirations.mediaKey,
      mediaName: inspirations.mediaName,
      mediaType: inspirations.mediaType,
      createdAt: inspirations.createdAt,
      saveCount: sql<number>`count(${saves.userId})`,
    })
    .from(inspirations)
    .leftJoin(saves, eq(saves.inspirationId, inspirations.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .groupBy(inspirations.id)
    .orderBy(desc(inspirations.createdAt))
    .limit(filters?.limit ?? 30);

  return rows.map(mapInspiration);
}

export async function getInspiration(id: string) {
  const db = getDb();
  const [row] = await db.select().from(inspirations).where(eq(inspirations.id, id)).limit(1);
  return row ? mapInspiration(row) : null;
}

export async function getParentInspiration(parentId: string | null) {
  return parentId ? getInspiration(parentId) : null;
}

export async function listProjects(inspirationId?: string) {
  const db = getDb();
  const rows = await db
    .select({
      id: projects.id,
      inspirationId: projects.inspirationId,
      inspirationTitle: inspirations.title,
      ownerId: projects.ownerId,
      ownerName: projects.ownerName,
      title: projects.title,
      description: projects.description,
      rolesNeeded: projects.rolesNeeded,
      status: projects.status,
      outputUrl: projects.outputUrl,
      createdAt: projects.createdAt,
      memberCount: sql<number>`count(${projectMembers.userId})`,
    })
    .from(projects)
    .leftJoin(inspirations, eq(inspirations.id, projects.inspirationId))
    .leftJoin(projectMembers, eq(projectMembers.projectId, projects.id))
    .where(inspirationId ? eq(projects.inspirationId, inspirationId) : undefined)
    .groupBy(projects.id)
    .orderBy(desc(projects.createdAt));
  return rows.map(mapProject);
}

export async function listMyItems(userId: string) {
  const db = getDb();
  const [ownedRows, savedRows, projectRows] = await Promise.all([
    db.select().from(inspirations).where(eq(inspirations.ownerId, userId)).orderBy(desc(inspirations.createdAt)),
    db
      .select({ inspiration: inspirations })
      .from(saves)
      .innerJoin(inspirations, eq(inspirations.id, saves.inspirationId))
      .where(eq(saves.userId, userId))
      .orderBy(desc(saves.createdAt)),
    db.select().from(projects).where(eq(projects.ownerId, userId)).orderBy(desc(projects.createdAt)),
  ]);
  return {
    owned: ownedRows.map(mapInspiration),
    saved: savedRows.map(({ inspiration }) => mapInspiration(inspiration)),
    projects: projectRows.map(mapProject),
  };
}

export async function isSaved(userId: string, inspirationId: string) {
  const db = getDb();
  const [row] = await db
    .select({ userId: saves.userId })
    .from(saves)
    .where(and(eq(saves.userId, userId), eq(saves.inspirationId, inspirationId)))
    .limit(1);
  return Boolean(row);
}
