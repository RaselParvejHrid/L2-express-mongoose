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

booksRouter.get("/", (req: Request, res: Response) => {});

booksRouter.get("/:bookId", (req: Request, res: Response) => {});

booksRouter.put("/:bookId", (req: Request, res: Response) => {});

booksRouter.delete("/:bookId", (req: Request, res: Response) => {});

export default booksRouter;
