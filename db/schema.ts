import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email"),
  displayName: text("display_name").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const inspirations = sqliteTable(
  "inspirations",
  {
    id: text("id").primaryKey(),
    ownerId: text("owner_id").notNull(),
    ownerName: text("owner_name").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    body: text("body").notNull().default(""),
    contentType: text("content_type").notNull(),
    licenseType: text("license_type").notNull(),
    price: integer("price").notNull().default(0),
    tags: text("tags").notNull().default("[]"),
    parentId: text("parent_id"),
    mediaKey: text("media_key"),
    mediaName: text("media_name"),
    mediaType: text("media_type"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_inspirations_created_at").on(table.createdAt),
    index("idx_inspirations_owner_id").on(table.ownerId),
    index("idx_inspirations_content_type").on(table.contentType),
  ]
);

export const saves = sqliteTable(
  "saves",
  {
    userId: text("user_id").notNull(),
    inspirationId: text("inspiration_id").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.inspirationId] }),
    index("idx_saves_user_id").on(table.userId),
  ]
);

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey(),
    inspirationId: text("inspiration_id").notNull(),
    ownerId: text("owner_id").notNull(),
    ownerName: text("owner_name").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    rolesNeeded: text("roles_needed").notNull().default("[]"),
    status: text("status").notNull().default("recruiting"),
    outputUrl: text("output_url"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_projects_created_at").on(table.createdAt),
    index("idx_projects_inspiration_id").on(table.inspirationId),
    index("idx_projects_owner_id").on(table.ownerId),
  ]
);

export const projectMembers = sqliteTable(
  "project_members",
  {
    projectId: text("project_id").notNull(),
    userId: text("user_id").notNull(),
    userName: text("user_name").notNull(),
    role: text("role").notNull(),
    status: text("status").notNull().default("pending"),
    joinedAt: text("joined_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.userId] }),
    index("idx_project_members_user_id").on(table.userId),
  ]
);
