import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import { UserRouter, MemRouter, CategoryRouter } from "../Routes";

function createServer() {
  const app: Express = express();
  //body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use("/api", UserRouter);
  app.use("/api", MemRouter);
  app.use("/api", CategoryRouter);
  return app;
}

export default createServer;
