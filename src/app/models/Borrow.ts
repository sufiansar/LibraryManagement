import mongoose, { Schema } from "mongoose";
import { Book, IBook } from "./Book";

export interface IBorrow {
  book: mongoose.Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

borrowSchema.post("save", async function (doc) {
  const book = await Book.findById(doc.book);
  if (!book) return;

  book.copies -= doc.quantity;
  await book.save();

  await Book.updateAvailability(book._id.toString());
});

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
