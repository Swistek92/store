import * as Yup from "yup";

const LoginUserValidationSchema = Yup.object({
  email: Yup.string().email("not valid email").required("email is required"),
  password: Yup.string().required("password required"),
});

export default LoginUserValidationSchema;
