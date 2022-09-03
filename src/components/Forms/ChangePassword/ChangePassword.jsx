import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { Input, Button } from "@/components";
import { passwordSchema } from "@/utils/yup";
import { changePassword, logout } from "@/utils/firebase";
import { logoutHandle } from "@/store/authSlice";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      const res = await changePassword(values.newPassword);
      console.log(res);
      if (res) {
        await logout();
        dispatch(logoutHandle());
        navigate("/login", { replace: true });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="my-5 text-3xl">Change Password</h2>
      <Input
        title="New password"
        type="password"
        id="newPassword"
        name="newPassword"
        setValue={formik.handleChange}
        value={formik.values.newPassword}
        error={formik.errors.newPassword}
        placeholder="••••••"
      />
      <Input
        title="Repeat password"
        type="password"
        id="repeatPassword"
        name="repeatPassword"
        setValue={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
        placeholder="••••••"
      />
      {formik.values.newPassword !== formik.values.repeatPassword && (
        <p className="text-sm mt-2 text-red-800 text-center mb-4">
          Passwords must match
        </p>
      )}
      <Button
        disabled={
          formik.values.newPassword !== formik.values.repeatPassword ||
          formik.errors.newPassword ||
          formik.errors.repeatPassword ||
          !formik.values.newPassword ||
          !formik.values.repeatPassword
        }
        text="Change Password"
        theme="primary"
        type="submit"
      />
    </form>
  );
};
