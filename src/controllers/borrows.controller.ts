import express, { Request, Response, Router } from "express";

const borrowsRouter: Router = express.Router(); // /api/borrow

borrowsRouter.post("/", (req: Request, res: Response) => {});

borrowsRouter.get("/", (req: Request, res: Response) => {});

export default borrowsRouter;
