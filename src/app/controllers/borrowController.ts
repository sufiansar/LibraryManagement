import { Request, Response } from "express";
import { Borrow } from "../models/Borrow";
import { Book } from "../models/Book";
import mongoose from "mongoose";
import { handleValidationError } from "../errorformat/validationError";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(book)) {
      res.status(400).json({
        message: "Invalid book ID",
        success: false,
      });
    }
    // export const getAllBooks = async (req: Request, res: Response) => {
    //   try {
    //     const {
    //       filter,
    //       sortBy = "createdAt",
    //       sort = "desc",
    //       limit = "40",
    //     } = req.query;

    //     const query: any = {};

    //     if (filter) {
    //       const genreFilter = (filter as string).toUpperCase();

    //       if (!Object.values(Genre).includes(genreFilter as Genre)) {
    //         res.status(400).json({
    //           success: false,
    //           message: "Invalid genre filter",
    //           error: {
    //             validGenres: Object.values(Genre),
    //           },
    //         });
    //       }
    //       query.genre = genreFilter;
    //     }
    //     const limitNumber = parseInt(limit as string);
    //     if (isNaN(limitNumber) || limitNumber < 1) {
    //       res.status(400).json({
    //         success: false,
    //         message: "Copies must be a positive number",
    //         error: {
    //           received: limit,
    //           expected: "Positive integer",
    //         },
    //       });
    //     }

    //     const books = await Book.find(query)
    //       .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
    //       .limit(limitNumber);
    //     res.status(200).json({
    //       success: true,
    //       message: "Books retrieved successfully",
    //       data: books,
    //     });
    //   } catch (error: any) {
    //     if (error.name === "ValidationError") {
    //       res.status(400).json(handleValidationError(error));
    //     } else {
    //       res.status(500).json({
    //         success: false,
    //         message: "Failed to retrieve books",
    //         error: error.message,
    //       });
    //     }
    //   }
    // };

    const bookToBorrow = await Book.findById(book);
    if (!bookToBorrow) {
      res.status(404).json({
        message: "Book not found",
        success: false,
      });
      return;
    }

    if (bookToBorrow.copies < quantity) {
      res.status(400).json({
        message: "Not enough copies available",
        success: false,
        availableCopies: bookToBorrow.copies,
      });
    }

    const borrow = await Borrow.create({
      book,
      quantity,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json(handleValidationError(error));
    } else {
      res.status(400).json({
        message: "Failed to borrowed book",
        success: false,
        error,
      });
    }
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          "book.title": 1,
          "book.isbn": 1,
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      summary,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json(handleValidationError(error));
    } else {
      res.status(500).json({
        message: "Failed to retrieve borrowed books summary",
        success: false,
        error: error.message,
      });
    }
  }
};
