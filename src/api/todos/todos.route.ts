import Router, { Response } from "express";
import { asyncFn } from "../../utils/async-function";
import { asyncWrap } from "../../utils/async-wrap";
import {
  TodosCollection as Todos,
  TodoTypeWithId,
  TodoType,
} from "./todos.model";

const router = Router();

router.get("/", async (req, res: Response<TodoType[]>) => {
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
});

export { router };
