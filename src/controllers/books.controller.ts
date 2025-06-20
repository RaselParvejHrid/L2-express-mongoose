import express, { Request, Response, Router } from "express";
import Book from "../models/books.model";

const booksRouter: Router = express.Router(); // /api/books

booksRouter.post("/", (req: Request, res: Response) => {
  const newBook = new Book(req.body);
});

booksRouter.get("/", (req: Request, res: Response) => {});

booksRouter.get("/:bookId", (req: Request, res: Response) => {});

booksRouter.put("/:bookId", (req: Request, res: Response) => {});

booksRouter.delete("/:bookId", (req: Request, res: Response) => {});

export default booksRouter;
