import React, { useState } from "react";
import { useFormik } from "formik";

import { Input, Button } from "@/components";
import { inputSchema } from "@/utils/yup";
import { resetPassword } from "@/utils/firebase";

export const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: inputSchema,
    onSubmit: async (values) => {
      await resetPassword(values.email);
    },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h2
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-800 cursor-pointer hover:underline"
      >
        Reset Password
      </h2>

      {isOpen && (
        <form className="border-none" onSubmit={formik.handleSubmit}>
          <Input
            title="Email"
            type="text"
            id="email"
            name="email"
            setValue={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            placeholder="you@example.com"
          />
          <Button
            disabled={!formik.values.email || formik.errors.email}
            text="LOGIN"
            theme="primary"
            type="submit"
          />
        </form>
      )}
    </div>
  );
};
