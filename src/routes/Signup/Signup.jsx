import React from "react";

import styles from "./Signup.module.scss";

import { RegisterForm } from "@/components";

export const Signup = () => {
  return (
    <div className={styles.base}>
      <RegisterForm />
    </div>
  );
};
