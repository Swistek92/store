import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { addCategory } from "../service/category.service";
import createServer from "../utils/server";

const app = createServer();

const category = {
  name: "Mqq111qqn",
  active: true,
  nestedCategories: ["T-shirt", "Jacket"],
  description: "Discover the latest trends in men's fashion and style. ",
};

describe("category", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("create", () => {
    it.only("should return 201 and category for correct data", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/category/")
        .send(category);

      expect(statusCode).toBe(201);
      expect(body).toEqual({
        ...category,
        __v: 0,
        _id: expect.any(String),
      });
    });
    it("should return 404 if we dont provide a name", () => {});
    it("should return 409 for duplicate name", () => {});
  });

  describe("update", () => {
    it("should return 404 if updating category does exist", () => {});
    it("should return 200 and new product", () => {});
  });

  describe("delete", () => {
    it("should return 404 if category does exist", () => {});
    it("should return 200 if category are deleted", () => {});
  });
});
