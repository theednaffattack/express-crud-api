import { MongoClient } from "mongodb";
import { AppConfigType, config as appConfig } from "./config/app-config";

export const mongoClient = new MongoClient(appConfig.env.MONGO_URI);
export const mongoDb = mongoClient.db();

export const getClient = function (config: AppConfigType) {
  return new MongoClient(config.env.MONGO_URI);
};

export const getDbInstance = function (client: MongoClient) {
  return client.db();
};
