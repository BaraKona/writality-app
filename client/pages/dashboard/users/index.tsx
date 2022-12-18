import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Header, Sidebar } from "../../../components/Navigation";
import { UserWrapper, Users } from "../../../components/Users";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Loading } from "../../../components/Loading";
import { useCreateProject } from "../../../hooks/projects/useCreateProject";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllProjects, createProject } from "../../../api/projects";

const Dashboard: NextPage = () => {
  const { getUsers, currentUser, users } = useAuthContext();
  useEffect(() => {
    getUsers();
  }, []);
  const queryClient = useQueryClient();
  // const fetchUsers = getUsers();
  const createAProject = () => {
    const project = {
      type: "main",
      uid: "1234",
      owner: currentUser.uid,
      title: "test",
      description: "test",
      dateCreated: {
        user: currentUser.uid,
        date: new Date().toISOString(),
      },
    };
    console.log(project);
    addProject.mutate(project);
  };

  const { isLoading, error, data } = useQuery("projects", getAllProjects);

  const addProject = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  if (isLoading) return <p>"Loading..."</p>;

  return (
    <div className="h-screen">
      <Header header="Users" />
      <Sidebar>
        <Loading isLoading={!users}>
          <UserWrapper>
            <Users users={users} />
            <button onClick={createAProject}>Create Project</button>
          </UserWrapper>
        </Loading>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
