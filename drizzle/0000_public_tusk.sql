CREATE TABLE `inspirations` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`owner_name` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`content_type` text NOT NULL,
	`license_type` text NOT NULL,
	`price` integer DEFAULT 0 NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`parent_id` text,
	`media_key` text,
	`media_name` text,
	`media_type` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_inspirations_created_at` ON `inspirations` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_inspirations_owner_id` ON `inspirations` (`owner_id`);--> statement-breakpoint
CREATE INDEX `idx_inspirations_content_type` ON `inspirations` (`content_type`);--> statement-breakpoint
CREATE TABLE `project_members` (
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`user_name` text NOT NULL,
	`role` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`joined_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`project_id`, `user_id`)
);
--> statement-breakpoint
CREATE INDEX `idx_project_members_user_id` ON `project_members` (`user_id`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`inspiration_id` text NOT NULL,
	`owner_id` text NOT NULL,
	`owner_name` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`roles_needed` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'recruiting' NOT NULL,
	`output_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_projects_created_at` ON `projects` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_projects_inspiration_id` ON `projects` (`inspiration_id`);--> statement-breakpoint
CREATE INDEX `idx_projects_owner_id` ON `projects` (`owner_id`);--> statement-breakpoint
CREATE TABLE `saves` (
	`user_id` text NOT NULL,
	`inspiration_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`user_id`, `inspiration_id`)
);
--> statement-breakpoint
CREATE INDEX `idx_saves_user_id` ON `saves` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`display_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
