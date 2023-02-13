import express, { Express, Request, Response } from "express";

const ProductRoutes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("<h1>hah</h1>");
  });
};

export default ProductRoutes;
