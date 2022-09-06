import React from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { Input, Button } from "@/components";
import { update } from "@/utils/firebase";
import { updateProfile } from "@/store/authSlice";

export const ProfileUpdate = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
    },
    onSubmit: async (values) => {
      await update({
        displayName: values.displayName,
        photoURL: values.photoURL,
      });

      dispatch(
        updateProfile({
          displayName: values.displayName,
          photoURL: values.photoURL,
        })
      );
      toast.success("Profile updated successfully");
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="my-5 text-3xl">Update Profile</h2>
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
          title="Photo"
          type="text"
          id="photoURL"
          name="photoURL"
          setValue={formik.handleChange}
          value={formik.values.photoURL}
          placeholder="Photo URL"
        />
        <Button
          disabled={!formik.values.displayName}
          text="SAVE"
          theme="primary"
          type="submit"
        />
      </form>
    </>
  );
};
