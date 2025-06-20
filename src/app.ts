import express, { Application, Request, Response } from "express";
import booksRouter from "./controllers/books.controller";
import borrowsRouter from "./controllers/borrows.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("Hi, Rasel");
});

export default app;
