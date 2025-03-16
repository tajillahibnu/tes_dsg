import 'dotenv/config';
import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/mysql2';
import { booksTable } from '../db/schema.js';
import { cors } from 'hono/cors';
import { eq } from 'drizzle-orm';
import * as dotenv from "dotenv"; // Import dotenv

const bookRoute = new Hono()
const db = drizzle(process.env.DATABASE_URL!);
dotenv.config(); // Load .env file

bookRoute.use(
    cors({
        origin: process.env.APP_URL as string, // Sesuaikan dengan domain FE
        // origin: "http://localhost:3000", // Sesuaikan dengan domain FE
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
    })
);

bookRoute.get('/', async (c) => {
    const result = await db.select().from(booksTable)
    return c.json(result)
});

bookRoute.get('/:id', async (c) => {
    try {
        const id = Number(c.req.param('id'));
        // Validasi ID
        if (isNaN(id)) {
            return c.json({ error: 'Invalid ID format' }, 400);
        }

        // Eksekusi query dengan limit 1
        const [getBook] = await db.select()
            .from(booksTable)
            .where(eq(booksTable.id, id))
            .limit(1);

        if (!getBook) {
            return c.json({ error: 'User not found' }, 404);
        }

        return c.json(getBook);

    } catch (error) {
        console.error('Error fetching user:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});

bookRoute.post('/', async (c) => {
    try {
        // Mengambil data JSON dari permintaan
        const body = await c.req.json();

        // Debugging: Cek input yang diterima
        console.log('Received input:', body);

        // Pastikan semua field yang wajib diisi tersedia
        // if (!body.namaBuku || !body.kategori || !body.penerbit) {
        if (!body.namaBuku) {
            return c.json({ message: "Nama Buku, Kategori, dan Penerbit harus diisi" }, 400);
        }

        // Buat objek untuk insert ke database
        const storeBook: typeof booksTable.$inferInsert = {
            namaBuku: body.namaBuku,
            kategori: body.kategori || '-',
            penerbit: body.penerbit || '-',
            ISBN: body.ISBN || null,  // Bisa null jika tidak diisi
            ISSN: body.ISSN || null,  // Bisa null jika tidak diisi
            pembuat: body.pembuat || null,
            tahunPembuatan: body.tahunPembuatan || null,
            harga: body.harga || null,
            keterangan: body.keterangan || null,
        };

        // Simpan data ke database
        const newBook = await db.insert(booksTable).values(storeBook);

        // Mengembalikan respons sukses
        return c.json({
            message: 'Book created successfully',
            data: storeBook,
        });
    } catch (error) {
        console.error('Error inserting books:', error);
        return c.text('Error inserting books', 500);
    }
});


bookRoute.put('/:id', async (c) => {
    const id = Number(c.req.param('id')); // Mengambil ID dari parameter URL
    const body = await c.req.json(); // Mengambil data JSON dari permintaan

    try {
        // Memperbarui data pengguna berdasarkan ID
        const result = await db
            .update(booksTable)
            .set({
                namaBuku: body.namaBuku,
                kategori: body.kategori || '-',
                penerbit: body.penerbit || '-',
                ISBN: body.ISBN || null,  // Bisa null jika tidak diisi
                ISSN: body.ISSN || null,  // Bisa null jika tidak diisi
                pembuat: body.pembuat || null,
                tahunPembuatan: body.tahunPembuatan || null,
                harga: body.harga || null,
                keterangan: body.keterangan || null,
            })
            .where(eq(booksTable.id, id)); // Menggunakan ID untuk menemukan pengguna yang tepat

        if (result) {
            return c.json({
                message: 'User  updated successfully',
                data: {
                    id,
                    name: body.name,
                    email: body.email
                },
            });
        } else {
            return c.text('User  not found', 404);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return c.text('Error updating user', 500);
    }
});

bookRoute.delete('/:id', async (c) => {
    const id = Number(c.req.param('id')); // Mengambil ID dari parameter URL
    try {
        // Menghapus pengguna berdasarkan ID
        const result = await db.delete(booksTable).where(eq(booksTable.id, id));

        if (result) {
            console.log('User  deleted!');
            return c.text('User  deleted successfully! ID: ' + id);
        } else {
            return c.text('User  not found', 404);
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        return c.text('Error deleting book', 500);
    }
});



export default bookRoute;
