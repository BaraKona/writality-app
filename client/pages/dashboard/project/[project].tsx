import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../components/Navigation";
import { BaseProjectView } from "../../../components/Project";
import { Editor } from "../../../components/Editor";
import { useRouter } from "next/router";
import { ChapterDisplayer, Chapter } from "../../../components/Project";
import { useDatabaseContext } from "../../../contexts/DatabaseContext";
import { IProject } from "../../../interfaces/Iproject";

export default function project() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { getProjectById } = useDatabaseContext();
  const [project, setProject] = useState<IProject>({
    uid: "",
    projectTitle: "",
    owner: "",
    createdAt: undefined,
  });
  useEffect(() => {
    async function getProject() {
      if (router?.query.project) {
        try {
          const doc = await getProjectById(router.query.project);
          setProject(doc[0]);
          setError("");
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        }
      }
    }
    getProject();
  }, [router]);

  return (
    <div className="h-screen">
      <Header header="Project" />
      <Sidebar>
        <BaseProjectView project={project}>
          <ChapterDisplayer id={project.uid}>
            <Chapter />
          </ChapterDisplayer>
          {/* <Editor /> */}
        </BaseProjectView>
      </Sidebar>
    </div>
  );
}
