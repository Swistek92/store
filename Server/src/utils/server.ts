import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "../Routes";
function createServer() {
  const app: Express = express();
  //body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use("/api", routes.userRouter);
  app.use("/api", routes.memRouter);
  app.use("/api", routes.categoryRouter);
  return app;
}

export default createServer;
