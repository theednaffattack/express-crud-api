import { ObjectId } from "mongodb";
import * as zod from "zod";

export const ParamsWithIdSchema = zod.object({
  id: zod
    .string()
    .min(1)
    .refine(
      (value) => {
        try {
          return new ObjectId(value);
        } catch (err) {
          // console.error("Unable to convert request params to Mongo ID.");
          // console.error(err);
          return false;
        }
      },
      { message: "Invalid ObjectId" }
    ),
});

export type ParamsWithIdType = zod.infer<typeof ParamsWithIdSchema>;
