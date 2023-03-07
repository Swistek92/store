import * as Yup from "yup";

const RegisterUserValidationSchema = Yup.object({
  name: Yup.string()
    .min(4, "min 4 chars long")
    .required("required name minimum 4 chars long"),
  email: Yup.string().email("email is required").required("email is required"),
  password: Yup.string()
    .min(6, "min 6 chars long")
    .required("password required, min 6 chars long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("confirm your password"),
});

export default RegisterUserValidationSchema;
