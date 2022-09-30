import Router from "express";
import { ParamsWithId } from "../../interfaces/params-with-id";
import { validateRequest } from "../../middlewares";
import * as TodosHandlers from "./todos.handlers";
import { TodoSchema } from "./todos.model";

const router = Router();

router.get("/", TodosHandlers.findAll);

router.get(
  "/:id",
  validateRequest({ params: ParamsWithId }),
  TodosHandlers.findOne
);

router.post(
  "/",
  validateRequest({ body: TodoSchema }),
  TodosHandlers.createOne
);

export { router };
