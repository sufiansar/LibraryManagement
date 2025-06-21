import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:bookId", getBookById);
bookRoutes.patch("/:bookId", updateBook);
bookRoutes.delete("/:bookId", deleteBook);

export default bookRoutes;
