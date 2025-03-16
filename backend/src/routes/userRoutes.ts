import 'dotenv/config';
import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/mysql2';
import { usersTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { cors } from 'hono/cors';

const userRoute = new Hono()
const db = drizzle(process.env.DATABASE_URL!);

// console.log('Connecting to database with URL:', process.env.DATABASE_URL);

// Aktifkan CORS untuk semua request
userRoute.use(
    cors({
        origin: "http://localhost:3000", // Sesuaikan dengan domain FE
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
    })
);

userRoute.get('/', async (c) => {
    const result = await db.select().from(usersTable)
    return c.json(result)
});

userRoute.get('/:id', async (c) => {
    try {
        const id = Number(c.req.param('id'));
        // Validasi ID
        if (isNaN(id)) {
            return c.json({ error: 'Invalid ID format' }, 400);
        }

        // Eksekusi query dengan limit 1
        const [user] = await db.select()
            .from(usersTable)
            .where(eq(usersTable.id, id))
            .limit(1);

        if (!user) {
            return c.json({ error: 'User not found' }, 404);
        }

        return c.json(user);

    } catch (error) {
        console.error('Error fetching user:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});

userRoute.post('/', async (c) => {
    try {
        // Mengambil data JSON dari permintaan
        const body = await c.req.json();

        // Menampilkan input yang diterima
        console.log('Received input:', body);

        const dataStore: typeof usersTable.$inferInsert = {
            name: body.name,
            email: body.email,
        };
        // Menyimpan data ke database
        const newUser = await db.insert(usersTable).values(dataStore);
        // Mengembalikan respons dengan data yang diterima
        return c.json({
            message: 'User  created successfully',
            data: body,
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        return c.text('Error inserting user', 500);
    }
});

userRoute.put('/:id', async (c) => {
    const id = Number(c.req.param('id')); // Mengambil ID dari parameter URL
    const body = await c.req.json(); // Mengambil data JSON dari permintaan

    try {
        // Memperbarui data pengguna berdasarkan ID
        const result = await db
            .update(usersTable)
            .set({
                name: body.name, // Jika Anda juga ingin memperbarui nama
                email: body.email // Jika Anda juga ingin memperbarui email
            })
            .where(eq(usersTable.id, id)); // Menggunakan ID untuk menemukan pengguna yang tepat

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


userRoute.delete('/:id', async (c) => {
    const id = Number(c.req.param('id')); // Mengambil ID dari parameter URL

    try {
        // Menghapus pengguna berdasarkan ID
        const result = await db.delete(usersTable).where(eq(usersTable.id, id));

        if (result) {
            console.log('User  deleted!');
            return c.text('User  deleted successfully! ID: ' + id);
        } else {
            return c.text('User  not found', 404);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return c.text('Error deleting user', 500);
    }
});

export default userRoute;
