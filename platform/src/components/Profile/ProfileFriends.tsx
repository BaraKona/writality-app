import { IconUserHeart } from "@tabler/icons-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { EmptyItem } from "../Chapters/EmptyItem";
import { useNavigate } from "react-router-dom";
import { initials, initialsColor } from "../../utils/userIcons";
import { BetaIcon } from "../BetaIcon";

export const ProfileFriends = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  if (currentUser?.friends?.length === 0) {
    return (
      <section className="flex h-56 w-full grow flex-col items-center justify-center gap-2 rounded-lg  p-4">
        <p className="text-xs">No friends found 🫠</p>
        <p className="text-center text-xs">
          Don't worry, you can always make new friends by inviting them to
          Collab.
        </p>
      </section>
    );
  }
  return (
    <section className="flex h-56 w-full max-w-[24rem] grow flex-col gap-2 rounded-lg  p-2">
      <div className="flex items-center gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <IconUserHeart size={18} stroke={2} />
          Friends
        </h2>
        <span className="m-0 rounded-full text-xs  text-rose-700 dark:text-sky-400">
          {currentUser?.friends?.length}
        </span>
      </div>
      <div className="flex flex-col items-start gap-2 overflow-auto">
        {currentUser?.friends?.map((friend: any) => (
          <div
            key={friend?.user.uid}
            className="relative flex w-full cursor-pointer gap-2 rounded-lg  p-1 px-2 transition-all duration-300 ease-in-out hover:bg-coolGrey-2 dark:bg-baseDarker dark:hover:bg-hoverDark"
            onClick={() => navigate(`/users/${friend?.user.uid}`)}
          >
            <div className="flex grow items-center gap-2">
              {/* <div className="h-8 w-8 rounded-full bg-coolGrey-1" /> */}
              <div className="dark:border-baseBorder  flex h-8 w-8 items-center justify-center rounded-full bg-coolGrey-3  dark:bg-borderDark/70">
                <div
                  className={`truncate text-xs font-bold  ${initialsColor(
                    friend?.user.name,
                  )} -mt-1`}
                >
                  {initials(friend?.user.name)}
                </div>
              </div>
              <p className="w-[7rem] truncate text-sm font-semibold text-coolGrey-7 dark:text-coolGrey-4">
                {friend?.user.name}
              </p>
            </div>
            <div className="ml-auto flex min-w-[1rem] items-center gap-2">
              {friend?.user?.role === "beta-tester" && <BetaIcon size={18} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
