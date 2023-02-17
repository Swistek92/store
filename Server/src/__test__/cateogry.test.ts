import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import CategoryModel from "../models/category.model";
import { addCategory, findCategory } from "../service/category.service";
import createServer from "../utils/server";

const app = createServer();

const category = {
  name: "Mqq111231qqn",
  active: true,
  nestedCategories: ["T-shirt", "Jacket"],
  description: "Discover the latest trends in men's fashion and style. ",
};

const noExistingCategory = {
  name: "MansPinkDress",
  active: true,
  nestedCategories: ["T-shirt", "Jacket"],
  description: "Discover the latest trends in men's fashion and style. ",
};

const FailRequestcategory = {
  // name: "Mqq111qqn",
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
    it("should return 201 and category for correct data", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/category/")
        .send(category);

      expect(statusCode).toBe(201);
      expect(body).toEqual({
        data: {
          ...category,
          __v: 0,
          _id: expect.any(String),
        },
        message: expect.any(String),
        status: "Ok",
        statusCode: 201,
      });
    });
    it("should return 400 if we dont provide a name", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/category/")
        .send(FailRequestcategory);

      expect(statusCode).toBe(400);
    });
    it("should return 409 for duplicate name", async () => {
      await supertest(app).post("/api/category/").send(category);

      const { statusCode } = await supertest(app)
        .post("/api/category/")
        .send(category);

      expect(statusCode).toBe(409);
    });
  });

  describe("update", () => {
    beforeAll(() => {
      CategoryModel.collection.drop();
    });
    it("should return 400 if we dont send name ", async () => {
      const { body } = await supertest(app)
        .post("/api/category/")
        .send(category);

      const { statusCode } = await supertest(app)
        .put(`/api/category/${body.data._id}`)
        .send();

      expect(statusCode).toBe(400);
    });

    it("should return 404 if we send request with invalid mongoose iD", async () => {
      const { statusCode } = await supertest(app)
        .put(`/api/category/123123213`)
        .send(category);

      expect(statusCode).toBe(404);
    });

    it("throw 422 if category with this id do not exist", async () => {
      // 63ead48efa236fee4f6fd92e
      const { statusCode } = await supertest(app)
        .put(`/api/category/63ead48efa236fee4f6fd92e`)
        .send(category);

      expect(statusCode).toBe(422);
    });
  });

  describe("delete", () => {
    it("should return 404 if category does exist", () => {});
    it("should return 200 if category are deleted", () => {});
  });
});
