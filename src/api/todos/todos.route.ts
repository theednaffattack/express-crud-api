import Router, { Response } from "express";
import { TodoType } from "./todos.model";

const router = Router();

router.get("/", (req, res: Response<TodoType[]>) => {
  res.json([
    {
      content: "A string",
      done: false,
    },
  ]);
});

export { router };
