import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { PASSWORD_RESET } from "../../api/api";
import { useFetch } from "../../Hooks/UseFetch";
import Error from "../../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../../Helper/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = useForm();
  const { data, error, request, loading } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) {
        navigate("/login");
      }
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Resetar a senha" />
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled text="Resetando..." />
        ) : (
          <Button text="Resetar" />
        )}

        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginPasswordReset;
