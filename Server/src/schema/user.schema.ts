import { object, number, string, TypeOf, z } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(4, "min 4 chars long"),
    account: string({
      required_error: "account are required",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "min length 6 chars long "),
  }),
};

export const userSchemas = {
  create: object({
    ...payload,
  }),
  // delete: object({
  //   ...params,
  // }),
  // update: object({
  //   ...payload,
  //   ...params,
  // }),
};
