import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTableBooks from "../../components/DataTableBooks";
import { fetchBooks, deleteBook } from "../../services/booksService";
import { BookData } from "../../services/types";

const TablePage = () => {
    const [books, setBooks] = useState<BookData[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 State untuk pencarian
    const [currentPage, setCurrentPage] = useState(1); // 🔢 State halaman saat ini
    const itemsPerPage = 5; // 📌 Jumlah item per halaman
    const navigate = useNavigate();
    const [inputWidth, setInputWidth] = useState('w-64'); // Lebar default
    const inputRef = useRef<HTMLInputElement>(null); // Menentukan tipe referensi sebagai HTMLInputElement

    const handleInputClick = () => {
        setInputWidth('w-96'); // Lebar yang lebih besar saat diklik
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setInputWidth('w-64'); // Kembalikan lebar saat klik di luar
        }
    };


    useEffect(() => {
        document.title = "Home | CRUD Buku";
        document.addEventListener('mousedown', handleClickOutside); // Tambahkan event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Hapus event listener saat komponen di-unmount
        };
    }, []);


    useEffect(() => {
        fetchBooks().then(setBooks);
    }, []);

    const handleDelete = async (id: number) => {
        await deleteBook(id);
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);

        // Setelah menghapus, pastikan currentPage tetap valid
        const newTotalPages = Math.ceil(updatedBooks.length / itemsPerPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(Math.max(newTotalPages, 1)); // Kembali ke halaman sebelumnya jika halaman saat ini kosong
        }
    };

    // 🔍 Filter buku berdasarkan input pencarian
    const filteredBooks = books.filter((book) =>
        book.namaBuku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.ISBN && book.ISBN.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // 🔢 Hitung total halaman
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    // Pastikan currentPage tetap valid saat filteredBooks berubah
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(Math.max(totalPages, 1));
        }
    }, [filteredBooks, totalPages]);

    // 📝 Data yang ditampilkan sesuai halaman yang dipilih
    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
            <h2 className="text-2xl font-bold text-white mb-4">Daftar Buku</h2>

            {/* Kontainer untuk tombol dan input pencarian */}
            <div className="flex justify-between items-center mb-4">
                {/* 🔍 Input Pencarian */}
                <input
                    type="text"
                    placeholder="Cari buku berdasarkan nama atau ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={handleInputClick} // Menambahkan event handler untuk klik
                    ref={inputRef} // Mengaitkan referensi ke input
                    className={`${inputWidth} px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300`}
                />


                {/* Tombol Tambah Buku */}
                <button
                    onClick={() => navigate("/form")}
                    className="px-4 py-2 bg-blue-500 text-white rounded border-2 hover:bg-green-600 transition font-bold"
                >
                    Tambah Buku
                </button>
            </div>

            {/* Komponen DataTableBooks */}
            <div className="mt-4 bg-white rounded-lg shadow-lg p-1">
                <DataTableBooks
                    books={paginatedBooks}
                    startIndex={(currentPage - 1) * itemsPerPage}
                    onDelete={handleDelete}
                    onEdit={(id) => navigate(`/form?id=${id}`)}
                />
                {/* <DataTableBooks books={paginatedBooks} onDelete={handleDelete} onEdit={(id) => navigate(`/form?id=${id}`)} /> */}
            </div>

            {/* 📌 Pagination Controls */}
            {totalPages >= 1 && (
                <div className="flex justify-between items-center mt-4">
                    <span className="text-white">
                        Halaman {currentPage} dari {totalPages} ({Math.min(currentPage * itemsPerPage, filteredBooks.length)}/{filteredBooks.length})
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 bg-blue-500 text-white rounded border-2 hover:bg-blue-600 transition shadow-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Prev
                        </button>
                        {/* Tombol Angka Halaman */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded shadow-md transition ${currentPage === page
                                    ? 'bg-green-500 text-white font-bold'  // Halaman aktif
                                    : 'bg-gray-200 text-black hover:bg-gray-300'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 bg-blue-500 text-white rounded border-2 hover:bg-blue-600 transition shadow-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablePage;
