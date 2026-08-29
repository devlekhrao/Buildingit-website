CREATE TABLE `contributions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripeSessionId` varchar(255) NOT NULL,
	`userId` int,
	`name` varchar(255),
	`email` varchar(320),
	`message` text,
	`amount` int NOT NULL,
	`currency` varchar(8) NOT NULL DEFAULT 'usd',
	`isPublic` int NOT NULL DEFAULT 1,
	`status` enum('pending','paid','failed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`paidAt` timestamp,
	CONSTRAINT `contributions_id` PRIMARY KEY(`id`),
	CONSTRAINT `contributions_stripeSessionId_unique` UNIQUE(`stripeSessionId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
