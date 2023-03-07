import * as Yup from "yup";
interface formData {
  image: string;
  title: string;
  author: string;
  categories: [string] | [];
  description: string;
}

const AddMemValidationSchema = Yup.object({
  image: Yup.mixed()
    .required("required")
    .test(
      "FILE_SIZE",
      "Tooo big!",
      (value: any) => value && value.size < 1024 * 1024 * 5 // 5mb
    )
    .test(
      "FILE_TYPE",
      "invalid file type!",
      (value: any) => value && ["image/png", "image/jpeg"].includes(value.type)
    ),
  title: Yup.string().required("required"),
  author: Yup.string().required("required"),
  categories: Yup.array().required("required").min(1, " min length1"),
  description: Yup.string().required("required"),
});

export default AddMemValidationSchema;
