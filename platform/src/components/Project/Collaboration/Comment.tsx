import { FC, ReactNode } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { useAuthContext } from "../../../contexts/AuthContext";
export const Comment: FC<{
  comment: { uid: string; content: string; date: Date; user: string };
  key: any;
}> = ({ comment, key }) => {
  const { currentUser } = useAuthContext();
  return (
    <>
      {comment.user === currentUser.uid ? (
        <div className="flex ml-auto flex-col space-y-2 " key={key}>
          <div className="flex items-center space-x-2 ml-auto text-right">
            <div className="flex flex-col">
              <p className="font-semibold">User</p>
              <p className="text-sm text-gray-400">
                {useTimeFromNow(comment.date.toString())}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-400"></div>
          </div>
          <div className="flex flex-col space-y-2 py-2 px-4 border border-violet-300 rounded-md max-w-[400px]">
            <p className="text-md text-violet-300">{comment.content}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-2" key={key}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-400"></div>
            <div className="flex flex-col">
              <p className="font-semibold">User</p>
              <p className="text-sm text-gray-400">
                {useTimeFromNow(comment.date.toString())}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 py-2 px-4 border border-blue-300 rounded-md max-w-fit">
            <p className="text-md text-blue-300">{comment.content}</p>
          </div>
        </div>
      )}
    </>
  );
};
