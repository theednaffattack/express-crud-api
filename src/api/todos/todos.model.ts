import { WithId } from "mongodb";
import * as z from "zod";
import { mongoDb, mongoClient } from "../../db";

export const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
});

export type TodoType = z.infer<typeof Todo>;
export type TodoTypeWithId = WithId<TodoType>;

export const TodosCollection = mongoDb.collection<TodoType>("todos");

export async function getTodosCollection() {
  await mongoClient.connect();
  return mongoDb.collection("todos");
}
