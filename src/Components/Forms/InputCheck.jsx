import React from "react";
import styles from "../Forms/check.module.css";

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        <input
          id={name}
          name={name}
          type={type}
          className={styles.input}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {label}
      </label>

      {error && <p className={styles.error}> {error}</p>}
    </div>
  );
};

export default Input;
