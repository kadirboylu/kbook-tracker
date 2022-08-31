import React from "react";

import styles from "./Input.module.scss";

export const Input = ({ title, type, placeholder }) => {
  const extraStyles = {
    input: "dark:bg-slate-700 dark:text-white",
  };

  return (
    <label className={styles.base}>
      <span className="dark:text-slate-800">{title}</span>
      <input
        className={extraStyles.input}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
};
