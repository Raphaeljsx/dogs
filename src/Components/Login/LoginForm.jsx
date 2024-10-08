import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";
import Head from "../../Helper/Head";
import { useStoreToken, useStoreUser } from "../../store/useStore";
import { userLogin } from "../../store/useStore";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  // const { userLogin, error, loading } = useContext(UserContext);
  
  const storeToken = useStoreToken();
  const storeUser = useStoreUser();
  const loading = storeToken.loading || storeUser.loading;
  const error = storeToken.error || storeToken.error;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin({username: username.value, password: password.value});
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type="text" label="Usuário" name="username" {...username} />
        <Input type="password" label="Senha" name="password" {...password} />
        {loading ? (
          <Button disabled text="Carregando" />
        ) : (
          <Button text="Entrar" />
        )}

        <Error error={error} />
      </form>
      <Link to="/login/perdeu" className={styles.perdeu}>
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastre
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
