CREATE TABLE `books` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nama` varchar(255) NOT NULL,
	`kategori` varchar(100) NOT NULL,
	`penerbit` varchar(255) NOT NULL,
	`ISBN` varchar(50),
	`ISSN` varchar(50),
	`pembuat` varchar(255),
	`tahun_pembuatan` int,
	`harga` float,
	`keterangan` varchar(500),
	CONSTRAINT `books_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_password_unique` UNIQUE(`password`)
);
