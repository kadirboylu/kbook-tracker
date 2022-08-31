import React from "react";

import styles from "./Login.module.scss";

import { Input, Button } from "@/components";

export const Login = () => {
  const extraStyles = {
    form: "dark:border-slate-700",
  };

  return (
    <div className={styles.base}>
      <form className={extraStyles.form}>
        <Input title="Email" type="text" placeholder="Email" />
        <Input title="Password" type="password" placeholder="Password" />
        <Button text="LOGIN" theme="primary" type="submit" />
      </form>
    </div>
  );
};
