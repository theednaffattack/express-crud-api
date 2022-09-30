import * as zod from "zod";

export const ParamsWithId = zod.object({ id: zod.string().min(1) });

export type ParamsWithIdType = zod.infer<typeof ParamsWithId>;
