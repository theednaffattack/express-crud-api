import { NextFunction, Request, Response } from "express";

import { asyncWrap } from "../../utils/async-wrap";
import { TodoType, TodosCollection as Todos } from "./todos.model";

export async function findAll(
  _req: Request,
  res: Response<TodoType[]>,
  next: NextFunction
) {
  const result = Todos.find();
  const [todos, todosError] = await asyncWrap(() => result.toArray());
  // Deal with any errors
  if (todosError) {
    console.error(todosError);
    next(todosError);
  }
  if (todos) {
    res.json(todos);
  } else {
    // If there are no todos and no todosError we have no idea what
    // went wrong, so throw an error.
    const error = {
      message: "An unknown error connecting to database has occurred.",
    };
    console.error(error);
    next(error);
  }
}
