import React, { FC, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { circle4 } from "../../assets/icons";
import { useDatabaseContext } from "../../contexts/DatabaseContext";
import { IChapter } from "../../interfaces/IChapter";

export const ChapterDisplayer: FC<{ children: ReactNode; id: string }> = ({
  children,
  id,
}) => {
  const [chapters, setChapters] = useState<IChapter[]>([] as IChapter[]);
  const { createChapter, getChaptersByProjectId } = useDatabaseContext();
  const [error, setError] = useState(false);

  const createNewChapter = async () => {
    try {
      const newChapter = await createChapter(id);
      setChapters(newChapter);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function getChapters() {
      try {
        const chapters: [] = await getChaptersByProjectId(id);
        console.log(chapters);
        setChapters(chapters);
      } catch (error) {
        setError(true);
      }
    }
    getChapters();
  }, [id]);
  console.log(chapters.length);
  return (
    <div className="py-4 px-8 w-full h-full">
      {chapters?.length == 0 ? (
        <div className=" flex my-52 gap-5 w-2/12 m-auto">
          <div className="w-52 my-auto">
            <Image src={circle4} alt="circle4" width={100} height={100} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 "> Chapters </h3>
            <>
              <p className="w-72">
                You have no chapters currently. Chapters make up your project
                and can be collaborated on.
                <br /> <br />
                Chapters are also versioned so you can always go back to
                previews versions if you decide to scrap your current work.
              </p>
              <button
                onClick={createNewChapter}
                className=" mt-3 bg-purple-400 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded"
              >
                Create
              </button>
            </>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};
