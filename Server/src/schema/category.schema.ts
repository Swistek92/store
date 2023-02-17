import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "categoryId is required",
    }),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export type createCategoryInput = TypeOf<typeof createCategorySchema>;
export type updateCategoryInput = TypeOf<typeof updateCategorySchema>;
