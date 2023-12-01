import { IconUserHeart } from "@tabler/icons-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { EmptyItem } from "../Chapters/EmptyItem";
import { useNavigate } from "react-router-dom";
import { UserCountryRenderer } from "../UserCountryRenderer";
import { initials, initialsColor } from "../../utils/userIcons";
import { BetaIcon } from "../BetaIcon";

export const ProfileFriends = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  if (currentUser?.friends?.length === 0) {
    return (
      <section className="flex h-56 w-full grow items-center justify-center gap-2 rounded-lg border border-border p-4 dark:border-none dark:bg-baseDarker">
        <EmptyItem
          title="No friends found 🫠"
          p1="Don't worry, you can always make new friends."
          className="!mt-4 flex items-center justify-center"
        />
      </section>
    );
  }
  return (
    <section className="flex h-56 w-full max-w-[24rem] grow flex-col gap-2 rounded-lg border border-border p-2 dark:border-none dark:bg-baseDarker">
      <div className="flex items-center gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <IconUserHeart size={20} stroke={2} />
          Friends
        </h2>
        <span className="m-0 rounded-full text-xs  text-rose-700 dark:text-sky-400">
          {currentUser?.friends?.length}
        </span>
      </div>
      <div className="flex flex-wrap items-start gap-2 overflow-auto">
        {currentUser?.friends?.map((friend: any) => (
          <div
            key={friend?.user.uid}
            className="relative flex basis-[11rem] cursor-pointer flex-col gap-2 rounded-lg border border-border bg-base p-2 transition-all duration-300 ease-in-out hover:border-coolGrey-3 hover:shadow-md dark:border-borderDark dark:bg-baseDarker"
            onClick={() => navigate(`/users/${friend?.user.uid}`)}
          >
            <div className="flex items-center gap-2">
              {/* <div className="h-8 w-8 rounded-full bg-coolGrey-1" /> */}
              <div className="dark:border-baseBorder  flex h-8 w-8 items-center justify-center rounded-full bg-coolGrey-1/70  dark:bg-borderDark/70">
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
            <div className="ml-1.5 flex items-center justify-between gap-2">
              <UserCountryRenderer country={friend?.user.country} />
              {friend?.user?.role === "beta-tester" && <BetaIcon size={18} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
