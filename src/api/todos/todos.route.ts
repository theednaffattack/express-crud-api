import Router, { Response } from "express";
import { TodosCollection as Todos, TodoTypeWithId } from "./todos.model";

const router = Router();

router.get("/", async (req, res: Response<TodoTypeWithId[]>) => {
  const result = Todos.find();
  const todos = await result.toArray();
  console.log("VIEW TODOS", { todos });
  res.json(todos);
});

export { router };
