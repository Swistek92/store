import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import CategoryRoutes from "../Routes/category.routes";
function createServer() {
  const app: Express = express();
  //body parser
  app.use(express.json());
  app.use(cors());

  CategoryRoutes(app);

  return app;
}

export default createServer;
