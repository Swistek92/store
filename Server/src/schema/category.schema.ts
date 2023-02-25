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
      required_error: "id is required",
    }),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const deleteCategorySchema = object({
  ...params,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export type createCategoryInput = TypeOf<typeof createCategorySchema>;
export type deleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
export type updateCategoryInput = TypeOf<typeof updateCategorySchema>;
