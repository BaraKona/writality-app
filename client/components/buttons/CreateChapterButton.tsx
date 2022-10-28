import { FC } from "react";

export const CreateChapterButton: FC<{ createNewChapter: () => void }> = ({
  createNewChapter,
}) => {
  return (
    <button
      onClick={createNewChapter}
      className=" mt-3 bg-purple-400 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded"
    >
      Create
    </button>
  );
};
