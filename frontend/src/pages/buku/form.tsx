import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../../services/booksService";
import { BookData } from "../../services/types";
import BookForm from "../../components/BookForm";

const BookFormPage = () => {
    const [searchParams] = useSearchParams();
    const bookId = searchParams.get("id");

    const [book, setBook] = useState<BookData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = bookId ? "Form Edit Buku" : "Form Tambah Buku";
        if (bookId) {
            getBookById(Number(bookId)).then(setBook);
        }
    }, [bookId]);

    const handleSubmit = async (data: BookData) => {
        if (bookId) {
            await updateBook(Number(bookId), data);
        } else {
            await createBook(data);
        }
        navigate("/");
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
            <BookForm
                bookId={bookId ? Number(bookId) : undefined}
                initialData={book || undefined}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/")}
            />
        </div>
    );
};

export default BookFormPage;
