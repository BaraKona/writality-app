import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../../components/Navigation";
import { UserWrapper, Users } from "../../../components/Users";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Loading } from "../../../components/Loading";
const Dashboard: NextPage = () => {
  const { getUsers, currentUser, users } = useAuthContext();
  useEffect(() => {
    getUsers();
  }, []);
  // const fetchUsers = getUsers();
  console.log(users);
  return (
    <div className="h-screen">
      <Header header="Users" />
      <Sidebar>
        <Loading isLoading={!users}>
          <UserWrapper>
            <Users users={users} />
          </UserWrapper>
        </Loading>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
