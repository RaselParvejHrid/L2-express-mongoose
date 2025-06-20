import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import booksRouter from "./controllers/books.controller";
import borrowsRouter from "./controllers/borrows.controller";
import mongoose from "mongoose";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("Hi, Rasel");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error";

  if (err.code === 11000) {
    status = 400;
  }

  res.status(status).json({
    message,
    success: false,
    error: err,
  });
};

app.use(errorHandler);

export default app;
