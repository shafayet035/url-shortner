CREATE TABLE `urls` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`slug` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `urls_id_unique` ON `urls` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `urls_slug_unique` ON `urls` (`slug`);