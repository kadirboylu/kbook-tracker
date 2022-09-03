import React from "react";

import styles from "./Button.module.scss";

export const Button = ({ click, text, theme, type, disabled }) => {
  const btnDisabled = disabled
    ? "opacity-75 cursor-not-allowed hover:opacity-75 active:translate-y-0"
    : "";

  return (
    <button
      onClick={click}
      disabled={disabled}
      type={type}
      className={`${styles.base} ${styles[theme]} ${btnDisabled}`}
    >
      {text}
    </button>
  );
};
