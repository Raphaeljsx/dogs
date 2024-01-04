import React, { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../assets/feed.svg?react";
import Estatisticas from "../../assets/estatisticas.svg?react";
import AdicionarFoto from "../../assets/adicionar.svg?react";
import Sair from "../../assets/sair.svg?react";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const mobile = useMedia("(max-width:640px)");
  const { userLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate("/login");
  }
  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          onClick={() => {
            setMobileMenu(!mobileMenu);
          }}
          className={`${styles.mobButton} ${
            mobileMenu && styles.mobButtonActive
          }`}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <MinhasFotos />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatisticas /> {mobile && "Minhas Estatísticas"}
        </NavLink>
        <NavLink to="/conta/postar">
          <AdicionarFoto /> {mobile && "Adicionar Fotos"}
        </NavLink>
        <button onClick={handleLogout}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
