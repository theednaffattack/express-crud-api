import zod from "zod";
require("dotenv").config();

const envSchema = zod.object({
  PORT: zod.string().min(1),
  MONGO_URI: zod.string().min(1),
  // MONGO_IMAGE_NAME: zod.string().min(1),
  // MONGO_CONTAINER_NAME: zod.string().min(1),
  // MONGO_DB_PATH: zod.string().min(1),
  // MONGO_EXTERIOR_PORT: zod.string().min(1),
  // MONGO_CONTAINER_PORT: zod.string().min(1),
  // MONGO_INITDB_ROOT_USERNAME: zod.string().min(1),
  // MONGO_INITDB_ROOT_PASSWORD: zod.string().min(1),
});

const appConfigSchema = zod.object({
  env: envSchema,
});

export type AppConfigType = zod.infer<typeof appConfigSchema>;

export const config = appConfigSchema.parse({ env: process.env });
