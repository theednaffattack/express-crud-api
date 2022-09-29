import { mongoClient } from "./db";

global.afterAll(async () => {
  await mongoClient.close();
});
