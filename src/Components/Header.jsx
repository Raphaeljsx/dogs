import React, { useContext } from "react";
import styles from "./css/Header.module.css";
import { Link } from "react-router-dom";
import Dog from "../assets/dogs.svg?react";
import { UserContext } from "../UserContext";
import { useStoreUser } from "../store/useStore";

const Header = () => {
  const { user } = useStoreUser();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dog />
        </Link>
        {user ? (
          <Link className={styles.login} to="/conta">
            {user.nome}
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
