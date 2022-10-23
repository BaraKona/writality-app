import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  DashboardNavigation,
  Header,
  Sidebar,
} from "../../components/Navigation";
import { useAuthContext } from "../../contexts/AuthContext";

const Dashboard: NextPage = () => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  return (
    <div className="h-screen">
      <Header header="Dashboard" />
      <Sidebar />
    </div>
  );
};

export default Dashboard;
