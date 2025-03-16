import axios from "axios";
import { BookData } from "./types";

// const API_URL = "http://localhost:8081/api/master/books";
const API_URL = process.env.REACT_APP_API_URL+"/master/books";

// Mengambil seluruh buku
export const fetchBooks = async (): Promise<BookData[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Mengambil detail buku berdasarkan ID
export const getBookById = async (id: number): Promise<BookData> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Menambahkan buku baru
export const createBook = async (data: BookData): Promise<BookData> => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

// Memperbarui data buku
export const updateBook = async (id: number, data: BookData): Promise<BookData> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

// Menghapus buku berdasarkan ID
export const deleteBook = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

// Menghitung jumlah total buku
export const getTotalBooks = async (): Promise<number> => {
    const response = await axios.get(API_URL);
    return response.data.length;
};