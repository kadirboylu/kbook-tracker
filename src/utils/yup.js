import * as yup from "yup";

export const formSchema = yup.object().shape({
  identifier: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Your password must be at least 6 characters.")
    .max(36, "Your password must be a maximum of 36 characters.")
    .required("Password is required."),
});

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Your password must be at least 6 characters.")
    .max(36, "Your password must be a maximum of 36 characters.")
    .required("Password is required."),
  repeatPassword: yup
    .string()
    .min(6, "Your password must be at least 6 characters.")
    .max(36, "Your password must be a maximum of 36 characters.")
    .required("Password is required."),
});

export const inputSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
});
