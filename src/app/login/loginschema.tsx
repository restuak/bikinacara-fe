import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("False Format Email")
    .required("Email required"),
  password: Yup.string()
    .trim()
    .min(5, "Minimum 5 characters")
    .matches(/\b/, "Password does not space")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .required("Password required"),
});

export default LoginSchema;
