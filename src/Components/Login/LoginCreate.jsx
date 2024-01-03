import React, { useContext } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api/api";
import { UserContext } from "../../UserContext";

const LoginCreate = () => {
  const username = useForm();
  const password = useForm();
  const email = useForm("email");
  const { userLogin } = useContext(UserContext);

  async function createUser(event) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const response = await fetch(url, options);

    if (response.ok) userLogin(username.value, password.value);
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={createUser}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button text="Cadastrar" />
      </form>
    </section>
  );
};

export default LoginCreate;
