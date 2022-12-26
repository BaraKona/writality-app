import { FC } from "react";
import { AiFillPlusSquare, AiFillFileAdd } from "react-icons/ai";

export const CreateChapterButton: FC<{ createNewChapter: () => void }> = ({
  createNewChapter,
}) => {
  return (
    <button
      onClick={createNewChapter}
      className="text-purple-300 font-bold px-2  cursor-pointer hover:text-purple-600 active:text-purple-500"
    >
      <AiFillFileAdd size={20} />
    </button>
  );
};
