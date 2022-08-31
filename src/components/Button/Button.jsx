import React from "react";

import styles from "./Button.module.scss";

export const Button = ({ text, theme, type }) => {
  return (
    <button type={type} className={`${styles.base} ${styles[theme]}`}>
      {text}
    </button>
  );
};
