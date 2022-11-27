import { FC } from "react";
import { FcBusinesswoman } from "react-icons/fc";
import Image from "next/image";

export const Users: FC<{ users: any }> = ({ users }) => {
  return (
    <div className="flex flex-wrap gap-4 px-4 py-2 justify-item-start">
      {users?.map((user: any) => {
        return (
          <div className="px-3 py-3 flex-grow min-w-[250px] max-w-[250px] shadow-md hover:shadow-lg cursor-pointer rounded-md border border-baseLight ">
            <div className="flex justify-center align-middle h-16">
              {user?.photoURL ? (
                <Image src={user.photoURL} />
              ) : (
                <FcBusinesswoman size={25} />
              )}
            </div>
            <p>{user?.displayName}</p>
          </div>
        );
      })}
    </div>
  );
};
