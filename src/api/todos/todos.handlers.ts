import { NextFunction, Request, Response } from "express";
import { InsertOneResult } from "mongodb";

import { wrapAsync } from "../../utils/wrap-async";
import { httpStatusCodes } from "../response-codes";
import {
  TodoSchema,
  TodosCollection,
  TodoType,
  TodoTypeWithId,
} from "./todos.model";

export async function findAll(
  _req: Request,
  res: Response<TodoTypeWithId[]>,
  next: NextFunction
) {
  const result = TodosCollection.find();
  const [todos, todosError] = await wrapAsync(() => result.toArray());
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

export async function createOne(
  req: Request<{}, InsertOneResult<TodoType>, TodoType>,
  res: Response,
  // res: Response<TodoTypeWithId>,
  next: NextFunction
) {
  const [validationResult, validationError] = await wrapAsync(() =>
    TodoSchema.parseAsync(req.body)
  );
  // Handle validation errors
  if (validationError) {
    console.error(validationError);
    next(validationError);
  }

  // If there is no validation error but also somehow
  // no validation result (should be impossible),
  // 1: send an error to the console,
  // 2: pass the error back to the client, and
  // 3: early return to short circuit TS from thinking 'validationResult'
  // is possibly null.
  if (!validationResult) {
    const errMessage = "Unknown error parsing req.body";
    console.error(errMessage);
    next(errMessage);
    // The return below stinks but otherwise TS throws an error below
    return;
  }

  // If our object passes validation insert it into the database
  const [insertedTodo, insertedTodoError] = await wrapAsync(() =>
    TodosCollection.insertOne(req.body)
  );

  if (insertedTodoError) {
    console.error(insertedTodoError);
    res.status(httpStatusCodes[422].code);
    next(insertedTodoError);
  }

  // If mongo couldn't insert (but somehow didn't error),
  // throw an error
  if (!insertedTodo?.acknowledged) {
    throw new Error("Error inserting Todo.");
  }

  // If all was successful respond with '201: "CREATED"'
  // Send JSON results back to the client
  res.status(httpStatusCodes[201].code);
  res.json({ ...req.body, _id: insertedTodo.insertedId });
}
