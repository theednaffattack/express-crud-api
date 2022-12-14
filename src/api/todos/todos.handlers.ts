import { NextFunction, Request, Response } from "express";
import { InsertOneResult, ObjectId } from "mongodb";
import { ParamsWithIdType } from "../../interfaces/params-with-id";

import { wrapAsync } from "../../utils/wrap-async";
import { httpStatusCodes } from "../response-codes";
import {
  TodoSchema,
  TodosCollection,
  TodoType,
  TodoWithIdType,
} from "./todos.model";

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

    next(errMessage);
    // The return below stinks but otherwise TS throws an error below
    return;
  }

  // If our object passes validation insert it into the database
  const [insertedTodo, insertedTodoError] = await wrapAsync(() =>
    TodosCollection.insertOne(req.body)
  );

  if (insertedTodoError) {
    res.status(httpStatusCodes[422].code).send();
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

export async function findAll(
  _req: Request,
  res: Response<TodoWithIdType[]>,
  next: NextFunction
) {
  const result = TodosCollection.find();
  const [todos, todosError] = await wrapAsync(() => result.toArray());
  // Deal with any errors
  if (todosError) {
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

    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithIdType, TodoWithIdType, {}>,
  res: Response<TodoWithIdType>,
  next: NextFunction
) {
  const [todo, todoErr] = await wrapAsync(() =>
    TodosCollection.findOne({ _id: new ObjectId(req.params.id) })
  );

  // Deal with any errors
  if (todoErr) {
    next(todoErr);
  }
  // If mongo can't find a Todo it returns 'null',
  // which also occurs if there is a 'todoErr'. We'll
  // test for both and if BOTH ARE NULL, we'll
  // take that to mean the Todo cannot be found.
  if (!todo && !todoErr) {
    res.status(404).send();
    throw new Error(`Todo with id "${req.params.id}" not found.`);
  }
  if (todo) {
    res.json(todo);
  } else {
    const retrieveTodoError = new Error("Unable to retrieve specified Todo.");
    res.status(httpStatusCodes[422].code).send();
    next(retrieveTodoError);
  }
}
