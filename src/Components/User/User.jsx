import React, { useContext } from "react";
import UserHeader from "./UserHeader";
import { Route, Routes } from "react-router-dom";
import Feed from "../Feed/Feed";
import UserPhotoPhost from "./UserPhotoPhost";
import UserStats from "./UserStats";
import { UserContext } from "../../UserContext";
import NotFound from "../NotFound";
import Head from "../../Helper/Head";

const User = () => {
  const { data } = useContext(UserContext);
  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPhost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
