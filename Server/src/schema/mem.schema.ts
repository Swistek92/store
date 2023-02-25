import { object, number, string, TypeOf, boolean, array } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Name is required",
    }),
    image: string({
      required_error: "image is required",
    }),
    author: string({
      required_error: "author is required",
    }),
    active: boolean({
      required_error: "active is required",
    }),
    categories: string().array().nonempty({
      message: "can't be empty",
    }),
  }),
  description: string({
    required_error: "description is required",
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
};

export const createMemSchema = object({
  ...payload,
});

export const deleteMemSchema = object({
  ...params,
});

export const updateMemSchema = object({
  ...payload,
  ...params,
});

export type createMemInput = TypeOf<typeof createMemSchema>;
export type deleteMemInput = TypeOf<typeof deleteMemSchema>;
export type updateMemInput = TypeOf<typeof updateMemSchema>;
