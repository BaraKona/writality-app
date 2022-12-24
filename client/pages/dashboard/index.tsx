import React from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../components/Navigation";
import { Authenticated } from "../../components/auth/Authenticated";

const User: NextPage = () => {
  return (
    <Authenticated>
      <div className="h-screen">
        <Header header="Dashboard" />
      </div>
    </Authenticated>
  );
};

export default User;
