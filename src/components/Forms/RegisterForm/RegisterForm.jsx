import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import { Input, Button } from "@/components";
import { formSchema } from "@/utils/yup";
import { register, update } from "@/utils/firebase";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const extraStyles = {
    form: "dark:border-slate-700",
  };

  const formik = useFormik({
    initialValues: {
      displayName: "",
      identifier: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const user = await register(values.identifier, values.password);

      update({ displayName: values.displayName });

      navigate("/login", { replace: true });

      if (user) return toast.success("Account created successfully");
    },
  });

  return (
    <form className={extraStyles.form} onSubmit={formik.handleSubmit}>
      <h2 className="my-5 text-3xl">SIGN UP</h2>
      <Input
        title="Name"
        type="text"
        id="displayName"
        name="displayName"
        setValue={formik.handleChange}
        value={formik.values.displayName}
        placeholder="John Doe"
      />
      <Input
        title="Email"
        type="text"
        id="identifier"
        name="identifier"
        setValue={formik.handleChange}
        value={formik.values.identifier}
        error={formik.errors.identifier}
        placeholder="you@example.com"
      />
      <Input
        title="Password"
        type="password"
        id="password"
        name="password"
        setValue={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
        placeholder="••••••"
      />
      <Button
        disabled={
          !formik.values.name ||
          !formik.values.identifier ||
          !formik.values.password ||
          formik.errors.identifier ||
          formik.errors.password
        }
        text="SIGN UP"
        theme="primary"
        type="submit"
      />
    </form>
  );
};
