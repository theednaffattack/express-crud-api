import Router from "express";
import { validateRequest } from "../../middlewares";
import * as TodosHandlers from "./todos.handlers";
import { TodoSchema } from "./todos.model";

const router = Router();

router.get("/", TodosHandlers.findAll);

router.post(
  "/",
  validateRequest({ body: TodoSchema }),
  TodosHandlers.createOne
);

export { router };
