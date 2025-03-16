import { int, mysqlTable, serial, varchar, float } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
    id: serial().primaryKey(),
    name: varchar({ length: 150 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull().unique(),
});

export const booksTable = mysqlTable("books", {
    id: serial("id").primaryKey(),
    namaBuku: varchar("nama", { length: 255 }).notNull(),
    kategori: varchar("kategori", { length: 100 }).notNull(),
    penerbit: varchar("penerbit", { length: 255 }).notNull(),
    ISBN: varchar("ISBN", { length: 50 }),
    ISSN: varchar("ISSN", { length: 50 }),
    pembuat: varchar("pembuat", { length: 255 }),
    tahunPembuatan: int("tahun_pembuatan"),
    harga: float("harga"),
    keterangan: varchar("keterangan", { length: 500 })
});

