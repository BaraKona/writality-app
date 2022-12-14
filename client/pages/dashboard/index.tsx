import React from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../components/Navigation";

const User: NextPage = () => {
  return (
    <div className="h-screen">
      <Header header="Dashboard" />
      <Sidebar>
        <div></div>
      </Sidebar>
    </div>
  );
};

export default User;
