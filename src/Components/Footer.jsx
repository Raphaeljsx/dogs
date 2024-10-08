import React from "react";
import styles from "./css/Footer.module.css";
import Foot from "../assets/dogs-footer.svg?react";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Foot />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
