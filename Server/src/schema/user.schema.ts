import { object, number, string, TypeOf, z } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(4, "min 4 chars long"),
    account: z.union([
      z
        .string({
          required_error: "email or phone is required",
        })
        .email({
          message: "Invalid email adress",
        }),
      z
        .number({
          required_error: "email or phone is required",
        })
        .min(100000000)
        .max(999999999),
    ]),
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
