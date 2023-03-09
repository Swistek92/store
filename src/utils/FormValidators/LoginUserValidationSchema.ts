import { useAppSelector } from "./../../store/store";
import * as Yup from "yup";

const LoginUserValidationSchema = () => {
  const schema = Yup.object({
    account: Yup.string().required("account is required"),
    password: Yup.string().required("password required"),
  });
  return schema;
};

export default LoginUserValidationSchema;
