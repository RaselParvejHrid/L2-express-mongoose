import express, { Request, Response, NextFunction, Router } from "express";
import Book from "../models/books.model";

const booksRouter: Router = express.Router(); // /api/books

booksRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBook = new Book(req.body);

      const isInvalid = newBook.validateSync();
      if (isInvalid) throw isInvalid;

      const data = await newBook.save();
      res
        .status(201)
        .json({ success: true, message: "Book Created Succefully!", data });
    } catch (err) {
      next(err);
    }
  }
);

booksRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // let limit = req.query.limit ? Number(req.query.limit) : 10;
      // let { filter, sortBy, sort } = req.query;

      // const data = await Book.find({
      //   genre: filter ? (filter as string).toUpperCase() : "SCIENCE",
      // })
      //   .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      //   .limit(limit);

      const data = await Book.find();
      res
        .status(200)
        .json({ success: true, message: "Books retrieved successfully", data });
    } catch (err) {
      next(err);
    }
  }
);

booksRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const data = await Book.findById(bookId);

      if (!data) {
        res.status(400).json({
          message: "No Doc Found.",
          success: false,
          error: "Non-existent ID provided.",
        });
        return;
      }

      res
        .status(200)
        .json({ message: "Book Retrieved Successfully.", success: true, data });
    } catch (error) {
      next(error);
    }
  }
);

booksRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const reqBody = req.body;
      let data = await Book.findByIdAndUpdate(bookId, reqBody, {
        returnDocument: "after",
      });

      if (!data) {
        res.status(400).json({
          message: "No Doc Found.",
          success: false,
          error: "Non-existent ID provided.",
        });
        return;
      }

      if (req.body.copies) {
        await Book.adjustAvailability(bookId);
        data = await Book.findById(bookId);
      }

      res
        .status(200)
        .json({ message: "Book Updated Successfully.", success: true, data });
    } catch (error) {
      next(error);
    }
  }
);

booksRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const data = await Book.findByIdAndDelete(bookId);

      if (!data) {
        res.status(400).json({
          message: "No Doc Found.",
          success: false,
          error: "Non-existent ID provided.",
        });
        return;
      }

      res.status(200).json({
        message: "Book Deleted Successfully.",
        success: true,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default booksRouter;
