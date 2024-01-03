import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
