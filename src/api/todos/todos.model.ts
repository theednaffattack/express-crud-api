import { WithId } from "mongodb";
import * as zod from "zod";
import { mongoDb, mongoClient } from "../../db";

export const TodoSchema = zod.object({
  content: zod.string().min(1),
  done: zod.boolean().default(false),
});

export type TodoType = zod.infer<typeof TodoSchema>;
export type TodoWithIdType = WithId<TodoType>;

export const TodosCollection = mongoDb.collection<TodoType>("todos");

export async function getTodosCollection() {
  await mongoClient.connect();
  return mongoDb.collection("todos");
}
