import express, { Express } from "express";
import ProductRoutes from "../Routes/product";
function createServer() {
  const app: Express = express();
  //body parser
  app.use(express.json());

  ProductRoutes(app);

  return app;
}

export default createServer;
