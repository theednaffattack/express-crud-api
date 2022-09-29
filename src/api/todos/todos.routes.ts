import Router from "express";
import * as TodosHandlers from "./todos.handlers";

const router = Router();

router.get("/", TodosHandlers.findAll);

router.post("/", TodosHandlers.createOne);

export { router };
