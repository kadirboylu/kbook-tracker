import React from "react";
import clsx from "clsx";

import styles from "./Profile.module.scss";

import { ProfileUpdate, ChangePassword } from "@/components";

export const Profile = () => {
  const extraStyles = {
    form: "dark:border-slate-700",
  };

  return (
    <div className={styles.base}>
      <div className={clsx(styles.form, extraStyles.form)}>
        <ProfileUpdate />
        <ChangePassword />
      </div>
    </div>
  );
};
