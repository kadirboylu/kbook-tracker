import React, { useState } from "react";
import clsx from "clsx";

import styles from "./Input.module.scss";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export const Input = ({
  id,
  name,
  placeholder,
  title,
  type,
  value,
  setValue,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(type);

  const extraStyles = {
    input: "dark:bg-slate-700 dark:text-white",
  };

  const handlePassword = () => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  return (
    <label className={styles.base}>
      <span className="dark:text-slate-800">{title}</span>
      <div className="w-full relative">
        <input
          className={extraStyles.input}
          id={id}
          name={name}
          type={showPassword}
          value={value}
          onChange={setValue}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div
            onClick={handlePassword}
            className={clsx(styles.seePassword, "dark:text-slate-400")}
          >
            {showPassword === "password" ? (
              <BsFillEyeFill />
            ) : (
              <BsFillEyeSlashFill />
            )}
          </div>
        )}
      </div>
      {error && value && (
        <span className="text-sm mt-2 ml-1 text-slate-600">• {error}</span>
      )}
    </label>
  );
};
