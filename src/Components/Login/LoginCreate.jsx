import React, { useCallback, useContext, useEffect, useState } from "react";
import Input from "../Forms/Input";
import InputCheck from "../Forms/InputCheck";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api/api";
import { UserContext } from "../../UserContext";
import { useFetch } from "../../Hooks/UseFetch";
import Error from "../../Helper/Error";
import Head from "../../Helper/Head";

const LoginCreate = () => {
  const username = useForm();
  const password = useForm();
  const email = useForm("email");
  const [view, setView] = useState(false);

  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = useFetch();

  const changeView = useCallback(() => {
    !view ? setView(true) : setView(false);
  }, [view]);

  useEffect(() => {
    if (view.checked) {
      changeView();
    }
  }, [changeView, view]);

  async function createUser(event) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response.ok) userLogin(username.value, password.value);
  }
  return (
    <section className="animeLeft">
      <Head title="Crie a sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={createUser}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input
          label="Senha"
          type={view ? "text" : "password"}
          name="password"
          {...password}
        />
        <InputCheck
          label="Ver senha"
          type="checkbox"
          name="ver"
          onChange={changeView}
        />
        {loading ? (
          <Button disabled text="Cadastrando.." />
        ) : (
          <Button text="Cadastrar" />
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
