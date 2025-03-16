# 📚 Aplikasi CRUD Buku - Ujian Tes Masuk

## 📌 Informasi Proyek

Aplikasi web ini dibuat sebagai ujian tes masuk dengan fitur CRUD (Create, Read, Update, Delete) untuk manajemen buku. Aplikasi ini memungkinkan pengguna untuk:
- ✅ Menambahkan buku baru ke dalam sistem.
- 📖 Melihat daftar buku yang tersedia.
- ✏️ Memperbarui informasi buku yang sudah ada.
- 🗑 Menghapus buku dari sistem.

Aplikasi ini dibangun menggunakan:
- **Backend**: HonoJS + Drizzle ORM + TypeScript
- **Frontend**: ReactJS + TypeScript
- **Database**: MySQL

Repository GitHub: [tajillahibnu/tes_dsg](https://github.com/tajillahibnu/tes_dsg)

---

## 📸 Tampilan Aplikasi

### 📌 Halaman Daftar Buku
![Daftar Buku](image/image-1.png)

### 📌 Halaman Form Tambah/Edit Buku
![Form Buku](image/image-2.png)

### 📌 Tampilan Tabel Data Buku
![Tabel Buku](image/image-3.png)


---

## 🚀 Instalasi & Menjalankan Proyek

### 1️⃣ Clone Repository
```sh
git clone https://github.com/tajillahibnu/tes_dsg.git
cd tes_dsg
```

---

## 🛠 Backend (HonoJS + Drizzle)
### 📌 Instalasi Backend
```sh
cd backend
npm install
```

### ⚙️ Konfigurasi `.env`
Buat file `.env` di dalam folder `backend` dan tambahkan konfigurasi berikut:
```env
DATABASE_URL=mysql://user:password@localhost:3306/db_name
APP_PORT=8081
# APP_URL digunakan untuk CORS frontend atau URL frontend
APP_URL=http://localhost:3000
```

### 🚀 Menjalankan Backend
```sh
npm run dev
```
Server akan berjalan di `http://localhost:8081`.

---

## 🎨 Frontend (ReactJS + TypeScript)
### 📌 Instalasi Frontend
```sh
cd frontend
npm install
```

### ⚙️ Konfigurasi `.env`
Buat file `.env` di dalam folder `frontend` dan tambahkan konfigurasi berikut:
```env
REACT_APP_API_URL=http://localhost:8081/api
```

### 🚀 Menjalankan Frontend
```sh
npm start
```
Aplikasi akan berjalan di `http://localhost:3000`.

---

## 📡 API Endpoint (Backend)

### **Buku**
- `GET /api/master/books` → Mendapatkan daftar buku
- `GET /api/master/books/:id` → Mendapatkan data buku berdasarkan ID
- `POST /api/master/books` → Menambahkan buku baru
- `PUT /api/master/books/:id` → Memperbarui informasi buku
- `DELETE /api/master/books/:id` → Menghapus buku dari sistem

---

## 🏗 Struktur Direktori
```
tes_dsg
│-- backend/          # Backend dengan HonoJS + Drizzle
│   │-- drizzle/      # Konfigurasi Drizzle ORM
│   │-- src/          # Source code backend
│   │--|-- db/        # Koneksi dan skema database
│   │--|-- routes/    # Endpoint API
│   │-- .env          # File environment backend
│   │-- package.json  # Konfigurasi backend
│
│-- frontend/         # Frontend dengan React + TypeScript
│   │-- public/       # File statis frontend
│   │-- src/          # Source code frontend
│   │--|-- components/ # Komponen UI
│   │--|-- pages/      # Halaman utama aplikasi
│   │--|-- services/   # API services dan helper
│   │-- .env          # File environment frontend
│   │-- package.json  # Konfigurasi frontend
│
│-- README.md         # Dokumentasi ini
```

---

## 📌 Versi Saat Development
Berikut adalah versi yang digunakan saat pengembangan proyek ini:

- **Node.js**: v22.6.0
- **npm**: 10.8.2
- **React**: react@19.0.0
- **HonoJS**: hono@4.7.4
- **Drizzle ORM**: drizzle-orm@0.40.0

---

## 💡 Catatan Tambahan
- Gunakan **npm** untuk instalasi dependency.
- Pastikan database **MySQL** sudah berjalan sebelum menjalankan backend.

---