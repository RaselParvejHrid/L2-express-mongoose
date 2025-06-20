import express, { Request, Response, Router, NextFunction } from "express";
import Book from "../models/books.model";
import Borrow from "../models/borrows.model";

const borrowsRouter: Router = express.Router(); // /api/borrow

borrowsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book, quantity } = req.body;
      let bookData = await Book.findById(book);

      if (!bookData) {
        res.status(400).json({
          message: "No Book with this ID Found.",
          success: false,
          error: "Non-existent ID provided.",
        });
        return;
      }

      if (bookData.copies < quantity) {
        res.status(400).json({
          message: "Not enough copies.",
          success: false,
          error: "Not enough copies available.",
        });
        return;
      }

      bookData.copies -= quantity;
      await bookData.save();
      await Book.adjustAvailability(book);

      const data = await Borrow.create(req.body);

      res.status(200).json({
        message: "Book borrowed Successfully.",
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

borrowsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Borrow.aggregate([
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
        data,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default borrowsRouter;
