import * as z from "zod";

export const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
});

export type TodoType = z.infer<typeof Todo>;
