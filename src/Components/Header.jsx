import React, { useContext } from "react";
import styles from "./css/Header.module.css";
import { Link } from "react-router-dom";
import Dog from "../assets/dogs.svg?react";
import { UserContext } from "../UserContext";

const Header = () => {
  const { data, userLogout } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dog />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
