import React from "react";

import styles from "./Signup.module.scss";

import { Input, Button } from "@/components";

export const Signup = () => {
  const extraStyles = {
    form: "dark:border-slate-700",
  };

  return (
    <div className={styles.base}>
      <form className={extraStyles.form}>
        <Input title="Name" type="text" placeholder="Name" />
        <Input title="Email" type="text" placeholder="Email" />
        <Input title="Password" type="password" placeholder="Password" />
        <Button text="SIGN UP" theme="primary" type="submit" />
      </form>
    </div>
  );
};
