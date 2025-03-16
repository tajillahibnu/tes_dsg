import { BookData } from "../services/types";
type Props = {
    books: BookData[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    startIndex: number;  // Tambahkan startIndex di sini
};

const DataTableBooks = ({ books, onDelete, onEdit,startIndex }: Props) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-gray-300">No</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-gray-300">Buku</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-gray-300">Kategori</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-gray-300">Penerbit</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-gray-300">Harga</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-gray-300 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book, index) => (
                            <tr key={book.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                {/* Kolom No */}
                                <td className="p-3 text-gray-700 dark:text-gray-300">{startIndex + index + 1}</td>

                                {/* Kolom Nama Buku & ISBN/ISSN */}
                                <td className="p-3">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800 dark:text-white">{book.namaBuku}</span>
                                        {book.ISBN && (
                                            <span className="text-sm text-gray-500 dark:text-gray-400">ISBN: {book.ISBN}</span>
                                        )}
                                        {book.ISSN && (
                                            <span className="text-sm text-gray-500 dark:text-gray-400">ISSN: {book.ISSN}</span>
                                        )}
                                    </div>
                                </td>

                                {/* Kategori */}
                                <td className="p-3 text-gray-700 dark:text-gray-300">{book.kategori}</td>

                                {/* Penerbit */}
                                <td className="p-3 text-gray-700 dark:text-gray-300">{book.penerbit}</td>

                                {/* Harga */}
                                <td className="p-3 text-gray-700 dark:text-gray-300">
                                    {book.harga ? `Rp ${book.harga.toLocaleString()}` : "-"}
                                </td>

                                {/* Aksi */}
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => onEdit(book.id!)}
                                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (book.id !== undefined) {
                                                const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus buku ini?");
                                                if (confirmDelete) {
                                                    onDelete(book.id);
                                                }
                                            }
                                        }}
                                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-3 text-center text-gray-500 dark:text-gray-400">
                                Tidak ada data buku.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTableBooks;
