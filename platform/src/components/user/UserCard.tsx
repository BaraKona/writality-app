import { FC } from "react";
import { IUser } from "../../interfaces/IUser";
import { UserCountryRenderer } from "../UserCountryRenderer";
import { initials, initialsColor } from "../../utils/userIcons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";
import { useAddBookmark } from "../../hooks/user/useAddBookmark";
import { useRemoveBookmark } from "../../hooks/user/useRemoveBookmark";
import { BetaIcon } from "../BetaIcon";

export const UserCard: FC<{ user: IUser }> = ({ user }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { mutate: addBookmark, isLoading: addLoading } = useAddBookmark();
  const { mutate: removeBookmark, isLoading: removeLoading } =
    useRemoveBookmark();

  return (
    <div
      onClick={() => navigate(`/users/${user.uid}`)}
      className="shadow\ relative flex h-[25rem] max-w-[314px] basis-[25rem] cursor-pointer flex-col rounded-lg shadow transition-all duration-200 ease-in-out hover:border-coolGrey-3 hover:shadow-md dark:hover:border-coolGrey-5 dark:hover:shadow-none"
    >
      <div className="flex h-24 w-full items-center  justify-center rounded-t-lg bg-gradient-to-tr from-pink-600/60 via-pink-700/60 to-amber-600/80" />
      <div className="dark:border-baseBorder absolute left-0 right-0 top-14 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[0.5rem] border-base bg-coolGrey-1/70 dark:border-baseDark dark:bg-borderDark/70">
        <div
          className={`truncate text-2xl font-bold  ${initialsColor(
            user.name,
          )} -mt-1`}
        >
          {initials(user.name)}
        </div>
      </div>
      <button
        className="absolute right-2 top-2 rounded-lg p-2 text-coolGrey-3 transition-all duration-300  ease-in-out hover:bg-coolGrey-1 hover:text-coolGrey-7 dark:text-coolGrey-4 dark:hover:bg-hoverDark"
        onClick={(e) => {
          e.stopPropagation(),
            currentUser.bookmarks?.some(
              (bookmark: any) => bookmark.url?.includes(user.uid),
            )
              ? removeBookmark(`/users/${user.uid}`)
              : addBookmark({
                  url: `/users/${user.uid}`,
                  name: user.name,
                  type: "user",
                });
        }}
        disabled={removeLoading || addLoading}
      >
        {currentUser.bookmarks?.some(
          (bookmark: any) => bookmark.url?.includes(user.uid),
        ) ? (
          <IconBookmarkFilled size={18} />
        ) : (
          <IconBookmarkPlus size={18} />
        )}
      </button>
      <div className="border-t-none flex grow flex-col rounded-b-lg p-2 dark:border dark:border-borderDark dark:hover:border-coolGrey-1/30">
        <div className="mt-8 flex flex-col items-center text-center">
          <span className="flex items-center gap-2 text-lg font-bold">
            {user.name} {user?.role === "beta-tester" && <BetaIcon size={20} />}
          </span>
          {/* <span className="text-sm text-coolGrey-5 dark:text-coolGrey-4 truncate">
						{user.email}
					</span> */}
          <UserCountryRenderer country={user.country} />
        </div>
        <div className="mt-2 line-clamp-5 h-[6.5rem] text-sm text-coolGrey-5 dark:text-coolGrey-5">
          {user.aboutMe ||
            "User has not written anything about themselves yet."}
        </div>

        <div className="mt-auto line-clamp-2 flex h-14 flex-wrap gap-1.5 ">
          {user.roles?.length === 0 && (
            <span className="h-6 rounded-lg bg-coolGrey-1 px-2 py-1 text-xs capitalize dark:bg-borderDark">
              No roles
            </span>
          )}
          {user.roles?.map((role) => (
            <span
              className="h-6 rounded-lg bg-coolGrey-1 px-2 py-1 text-xs capitalize dark:bg-fuchsia-700 dark:text-coolGrey-8"
              key={role}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
