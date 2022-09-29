import { WithId } from "mongodb";
import * as zod from "zod";
import { mongoDb, mongoClient } from "../../db";

export const Todo = zod.object({
  content: zod.string().min(1),
  done: zod.boolean().default(false),
});

export type TodoType = zod.infer<typeof Todo>;
export type TodoTypeWithId = WithId<TodoType>;

export const TodosCollection = mongoDb.collection<TodoType>("todos");

export async function getTodosCollection() {
  await mongoClient.connect();
  return mongoDb.collection("todos");
}
