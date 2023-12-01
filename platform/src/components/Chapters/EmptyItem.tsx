import { FC } from "react";
import { circle4 } from "../../assets/icons";
import { BlueButton } from "../buttons/BlueButton";

export const EmptyItem: FC<{
  createNewChapter?: () => void;
  title?: string;
  p1?: string;
  p2?: string;
  className?: string;
}> = ({ createNewChapter, title, p1, p2 }) => {
  return (
    <div className="mx-auto flex overflow-y-auto">
      <div className=" m-auto flex flex-row flex-wrap items-center justify-center gap-5">
        <div className="my-auto">
          <img src={circle4} alt="circle4" width={200} height={200} />
        </div>
        <div>
          <h3 className="text-md mb-2 font-semibold "> {title} </h3>
          <>
            <p className="mb-3 w-72 text-sm text-coolGrey-4 dark:text-coolGrey-6">
              {p1}
              {p1 && p2 && <br />}
              {p2}
            </p>
            {createNewChapter && (
              <div className="mr-auto w-32">
                <BlueButton onClick={createNewChapter}>Create</BlueButton>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
