import React from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../components/Navigation";
import { Authenticated } from "../../components/auth/Authenticated";

const User: NextPage = () => {
  return (
    <Authenticated>
      <div className="h-screen">
        <Header header="Dashboard" />
        <Sidebar>
          <div></div>
        </Sidebar>
      </div>
    </Authenticated>
  );
};

export default User;
