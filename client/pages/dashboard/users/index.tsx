import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../../components/Navigation";
import { UserWrapper, Users } from "../../../components/Users";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Loading } from "../../../components/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllProjects, createProject } from "../../../api/projects";
import { IProject } from "../../../interfaces/IProject";

const Dashboard: NextPage = () => {
  const { currentUser } = useAuthContext();

  return (
    // <Loading isLoading={isLoading}>
    <>
      <Header header="Users" />
      <UserWrapper>{/* <Users users={users} /> */}</UserWrapper>
    </>
    // </Loading>
  );
};

export default Dashboard;
