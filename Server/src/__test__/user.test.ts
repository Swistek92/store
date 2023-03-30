/* eslint-disable import/first */
import * as dotenv from "dotenv";
dotenv.config({ path: "./../../.env.test" });
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/server";
const app = createServer();

describe("user test", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoServer.getUri());
    process.env.test = "test";
  });
  afterAll(async () => {
    process.env.test = undefined;
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  it("test env", () => {
    expect(process.env.test).toBe("test");
  });

  const user = {
    name: "123123123123123",
    account: "swistekxd@gmail.com",
    password: "123123123123123",
  };

  let jwtActiveToken: string;
  let jwtAcessToken: string;

  describe("create user", () => {
    it("create user with email  account", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/user/register")
        .send(user);
      expect(statusCode).toEqual(200);
      jwtActiveToken = body.data;
    });

    it("active user with created jwtActiveToken ", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/user/active")
        .send({ activeToken: jwtActiveToken });
      const includeName = JSON.stringify(body).includes(user.name);
      const includeAccount = JSON.stringify(body).includes(user.account);
      expect(includeName).toBeTruthy();
      expect(includeAccount).toBeTruthy();
      expect(statusCode).toEqual(201);
    });
  });

  describe("login user", () => {
    it("should login user", async () => {
      const { statusCode, body, headers } = await supertest(app)
        .post("/api/user/login")
        .send(user);
      expect(statusCode).toBe(200);
      console.log(headers["set-cookie"][0].split(";")[0].split("=")[1]);
      // const cookies = JSON.parse(header);
      // console.log(cookies);
      // jwtAcessToken = body.data.accessToken;
      jwtAcessToken = headers["set-cookie"][0].split(";")[0].split("=")[1];
    });
  });
  describe("authorization", () => {
    it("should throw unauthorized error if user are not Admin", async () => {
      const { statusCode, body } = await supertest(app)
        .get("/api/user/getAll")
        .set("Cookie", `accessToken=${jwtAcessToken}`);

      expect(statusCode).toBe(401);
    });
    it("should return status code 200", async () => {
      const { statusCode, body } = await supertest(app)
        .get("/api/user/justForUserTest")
        .set("Cookie", `accessToken=${jwtAcessToken}`);

      expect(statusCode).toBe(200);
    });
  });
});
