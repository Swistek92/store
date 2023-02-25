import cors from "cors";
import express, { Express } from "express";
import CategoryRoutes from "../Routes/category.routes";
import MemRoutes from "../Routes/mem.routes";
function createServer() {
  const app: Express = express();
  //body parser
  app.use(express.json());
  app.use(cors());

  CategoryRoutes(app);
  MemRoutes(app);

  return app;
}

export default createServer;
