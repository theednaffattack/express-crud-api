import { Request, Response } from "express";

import { asyncWrap } from "../../utils/async-wrap";
import { TodoType, TodosCollection as Todos } from "./todos.model";

export async function findAll(_req: Request, res: Response<TodoType[]>) {
  const result = Todos.find();
  const [todos, todosError] = await asyncWrap(() => result.toArray());
  // Deal with any errors
  if (todosError) {
    console.error(todosError);
  }
  if (todos) {
    res.json(todos);
  } else {
    console.error(todosError);
  }
}
