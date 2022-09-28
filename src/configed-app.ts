import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import { appRouter } from "./api/api";
import MessageResponse from "./interfaces/MessageResponse";
import { AppConfigType } from "./config/app-config";

require("dotenv").config();

export function configedApp(config: AppConfigType) {
  const app = express();

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get<{}, MessageResponse>("/", (req, res) => {
    res.json({
      message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    });
  });

  app.use("/api/v1", appRouter);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);
}
