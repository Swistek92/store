import * as Yup from "yup";
import { useAppSelector } from "../../store/store";

const RegisterUserValidationSchema = () => {
  const { registerType } = useAppSelector((state) => state.modal);

  const schema = Yup.object({
    name: Yup.string()
      .min(4, "min 4 chars long")
      .required("required name minimum 4 chars long"),
    account: Yup.lazy((value) =>
      registerType === "email"
        ? Yup.string().email("email is required").required("email is required")
        : Yup.string()
            .test(
              "test",
              "just polish phone numbers, makes from 9 numbers without directional and plus",
              (e) => Number(e) >= 100000000 && Number(e) <= 999999999
            )
            .required("account is required")
    ),
    password: Yup.string()
      .min(6, "min 6 chars long")
      .required("password required, min 6 chars long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("confirm your password"),
  });

  return schema;
};

export default RegisterUserValidationSchema;
