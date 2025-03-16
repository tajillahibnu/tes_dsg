import { useState, useEffect } from "react";
import { BookData } from "../services/types";

interface BookFormProps {
    bookId?: number;
    initialData?: BookData;
    onSubmit: (book: BookData) => void;
    onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ bookId, initialData, onSubmit, onCancel }) => {
    const [book, setBook] = useState<BookData>(
        initialData || {
            namaBuku: "",
            kategori: "",
            penerbit: "",
            ISBN: "",
            ISSN: "",
            pembuat: "",
            tahunPembuatan: undefined,
            harga: undefined,
            keterangan: "",
        }
    );

    useEffect(() => {
        if (initialData) {
            setBook(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(book);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{bookId ? "Edit Buku" : "Tambah Buku"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Baris untuk Nama Buku, Kategori, Penerbit, dan Pembuat */}
                {/* Baris untuk ISBN, ISSN, Tahun Pembuatan, dan Harga */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "ISBN", name: "ISBN", type: "text" },
                        { label: "ISSN", name: "ISSN", type: "text" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="flex flex-col">
                            <label className="block font-medium">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={book[name as keyof BookData] || ""}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col space-y-4">
                    {[
                        { label: "Nama Buku", name: "namaBuku", type: "text", required: true },
                        { label: "Kategori", name: "kategori", type: "text", required: true },
                        { label: "Penerbit", name: "penerbit", type: "text", required: true },
                        { label: "Pembuat", name: "pembuat", type: "text" },
                    ].map(({ label, name, type, required }) => (
                        <div key={name} className="flex flex-col">
                            <label className="block font-medium">
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={book[name as keyof BookData] || ""}
                                onChange={handleChange}
                                required={required}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>

                {/* Baris untuk ISBN, ISSN, Tahun Pembuatan, dan Harga */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "Tahun Pembuatan", name: "tahunPembuatan", type: "number" },
                        { label: "Harga", name: "harga", type: "number" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="flex flex-col">
                            <label className="block font-medium">{label}:</label>
                            <input
                                type={type}
                                name={name}
                                value={book[name as keyof BookData] || ""}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>

                {/* Keterangan */}
                <div>
                    <label className="block font-medium">Keterangan:</label>
                    <textarea
                        name="keterangan"
                        value={book.keterangan || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    ></textarea>
                </div>

                {/* Tombol Simpan dan Batal */}
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {bookId ? "Update" : "Simpan"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
