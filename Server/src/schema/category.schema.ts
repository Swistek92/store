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

export const categorySchemas = {
  create: object({
    ...payload,
  }),
  delete: object({
    ...params,
  }),
  update: object({
    ...payload,
    ...params,
  }),
};

export type createCategoryInput = TypeOf<typeof categorySchemas.create>;
export type deleteCategoryInput = TypeOf<typeof categorySchemas.delete>;
export type updateCategoryInput = TypeOf<typeof categorySchemas.update>;
