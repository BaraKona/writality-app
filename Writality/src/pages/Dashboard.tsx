import React from "react";
import { Sidebar } from "../components/Navigation";
import { Authenticated } from "../components/auth/Authenticated";

export const Dashboard = () => {
  return (
    <Authenticated>
      <div className="h-screen"></div>
    </Authenticated>
  );
};
