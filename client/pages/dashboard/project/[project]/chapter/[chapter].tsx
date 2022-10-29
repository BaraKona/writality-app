import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../../components/Navigation";
import { Editor } from "../../../../../components/Editor";
import { useRouter } from "next/router";

import { CreateChapterButton } from "../../../../../components/buttons";
import { useDatabaseContext } from "../../../../../contexts/DatabaseContext";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { IProject } from "../../../../../interfaces/Iproject";
import { IChapter } from "../../../../../interfaces/IChapter";
import { toast } from "react-hot-toast";

export default function chapter() {
  const router = useRouter();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const { getProjectById, createChapter, getChaptersByProjectId } =
    useDatabaseContext();

  return (
    <div className="h-screen">
      <Header header="Project" />
      <Sidebar>
        {loading ? (
          <div>loading</div>
        ) : (
          <div>
            {" "}
            <Editor />
          </div>
        )}
      </Sidebar>
    </div>
  );
}
