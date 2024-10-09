import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";
import NotFound from "../NotFound";
import { useStoreUser } from "../../store/useStore";
import Loading from "../../Helper/Loading";

const Login = () => {
  const { user, loading } = useStoreUser();

  // if (login === true) return <Navigate to="/conta" />;
  if(loading) return <Loading />
  if (user) return <Navigate to="/conta" />;
  
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="criar" element={<LoginCreate />}></Route>
          <Route path="perdeu" element={<LoginPasswordLost />}></Route>
          <Route path="resetar" element={<LoginPasswordReset />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
