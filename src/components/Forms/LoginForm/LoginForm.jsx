import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import clsx from "clsx";
import toast from "react-hot-toast";

import { Input, Button } from "@/components";
import { formSchema } from "@/utils/yup";
import { login, logout, sendVerification } from "@/utils/firebase";
import { loginHandle } from "@/store/authSlice";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(true);

  const extraStyles = {
    form: "dark:border-slate-700",
    verificationStyle: "md:w-2/6 w-70 text-justify p-4 rounded-lg bg-slate-200",
    verificationDark: "dark:bg-slate-700 dark:text-white",
  };

  const handleVerification = async () => {
    const res = await sendVerification();

    if (res) {
      await logout();
      setIsVerified(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const user = await login(values.identifier, values.password);

      if (user.emailVerified) {
        dispatch(
          loginHandle({
            email: user.email,
            uid: user.uid,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );

        toast.success("Successfully logged in");
        navigate("/", { replace: true });
      } else if (!user.emailVerified) {
        setIsVerified(false);
      }
    },
  });

  return (
    <>
      {!isVerified && (
        <div
          className={clsx(
            extraStyles.verificationStyle,
            extraStyles.verificationDark
          )}
        >
          <p className="p-1">
            Please verify your email. Click the button and get a verification
            email. (Check your spam folder)
          </p>
          <Button click={handleVerification} text="Send Email" theme="red" />
        </div>
      )}
      <form className={extraStyles.form} onSubmit={formik.handleSubmit}>
        <h2 className="my-5 text-3xl">LOGIN</h2>
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
            !formik.values.identifier ||
            !formik.values.password ||
            formik.errors.identifier ||
            formik.errors.password ||
            !isVerified
          }
          text="LOGIN"
          theme="primary"
          type="submit"
        />
      </form>
    </>
  );
};
