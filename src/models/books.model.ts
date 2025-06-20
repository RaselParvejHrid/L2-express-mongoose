import { Model, Schema, model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

interface IBookModelType extends Model<IBook> {
  adjustAvailability(bookId: string): Promise<void>;
}

const bookSchema = new Schema<IBook, IBookModelType>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger, // Ensures no fractions
        message: "Copies must be an integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.static(
  "adjustAvailability",
  async function adjustAvailability(bookId) {
    const book = await this.findById(bookId);
    if (!book) return;
    book.available = book.copies > 0; // Update available to false if copies become 0

    await book.save();
    return book;
  }
);

const Book = model<IBook, IBookModelType>("Book", bookSchema);

export default Book;
