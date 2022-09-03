import React from "react";

import styles from "./Login.module.scss";

import { LoginForm, ResetPassword } from "@/components";

export const Login = () => {
  return (
    <div className={styles.base}>
      <LoginForm />
      <ResetPassword />
    </div>
  );
};
