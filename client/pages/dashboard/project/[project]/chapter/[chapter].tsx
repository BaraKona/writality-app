import React, { FC, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../../components/Navigation";
import { Editor, EditorWrapper } from "../../../../../components/Editor";
import { useRouter } from "next/router";

import { useDatabaseContext } from "../../../../../contexts/DatabaseContext";
import { useAuthContext } from "../../../../../contexts/AuthContext";

export default function chapter() {
  const router = useRouter();
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const { getProjectById, createChapter, getChaptersByProjectId } =
    useDatabaseContext();

  return (
    <div className="h-screen">
      <Header header="Chapter" />
      <Sidebar>
        {loading ? (
          <div>loading</div>
        ) : (
          <EditorWrapper>
            <Editor />
          </EditorWrapper>
        )}
      </Sidebar>
    </div>
  );
}
