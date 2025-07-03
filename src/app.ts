import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
const cors = require("cors");
import booksRouter from "./controllers/books.controller";
import borrowsRouter from "./controllers/borrows.controller";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://l2-redux.vercel.app"],
  })
);

app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json("Hi, Rasel");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error";

  if (err.code === 11000 || err.name === "CastError") {
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
