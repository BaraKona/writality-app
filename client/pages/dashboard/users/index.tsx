import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../../components/Navigation";
import { UserWrapper, Users } from "../../../components/Users";
import { useAuthContext } from "../../../contexts/AuthContext";

const Dashboard: NextPage = () => {
  const { getUsers, currentUser } = useAuthContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    getAllUsers();
  }, []);
  return (
    <div className="h-screen">
      <Header header="Users" />
      <Sidebar>
        <UserWrapper>
          <Users users={users} />
        </UserWrapper>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
