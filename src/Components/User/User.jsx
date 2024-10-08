import React from "react";
import UserHeader from "./UserHeader";
import { Route, Routes } from "react-router-dom";
import Feed from "../Feed/Feed";
import UserPhotoPhost from "./UserPhotoPhost";
import UserStats from "./UserStats";
import NotFound from "../NotFound";
import Head from "../../Helper/Head";
import { useStoreUser } from "../../store/useStore";

const User = () => {
  const {user} = useStoreUser();
  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={user.id} />} />
        <Route path="postar" element={<UserPhotoPhost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
