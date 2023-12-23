import { useAuthContext } from "../../contexts/AuthContext";
import { FC } from "react";
import { SmallText } from "../texts/SmallText";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IUser } from "../../interfaces/IUser";
import { initials, initialsColor } from "../../utils/userIcons";
import { useLocalStorage } from "@mantine/hooks";

export const UserFriends: FC<{ chatId: string }> = ({ chatId }) => {
  const { currentUser } = useAuthContext();
  const [parent] = useAutoAnimate();
  const [userChat, setUserChat] = useLocalStorage({
    key: "userChat",
  });

  if (!currentUser?.friends || currentUser?.friends?.length === 0)
    return (
      <section className="grow" ref={parent}>
        <SmallText className="text-center" light>
          You have no friends 😔. Your friends will appear here (hopefully soonish 🤞) and you can
          chat with them.
        </SmallText>
      </section>
    );

  return (
    <section className="grow" ref={parent}>
      <ul className="flex flex-col gap-1">
        {currentUser?.friends?.map((friend: IUser["friends"][0]) => (
          <li
            key={friend?.user?.uid}
            onClick={() => setUserChat(`${friend?.chat._id}`)}
            className={`group relative flex cursor-pointer items-center gap-1 rounded-md p-2 py-1 text-xs font-medium transition-all duration-500 ease-in-out hover:bg-coolGrey-1 dark:hover:bg-hoverDark ${
              userChat?.split("_")[0] === friend?.chat._id && `bg-coolGrey-1 dark:bg-hoverDark`
            }`}
          >
            {friend?.chat?.users?.find((user) => user.user === currentUser._id)?.isRead === false &&
              chatId !== friend?.chat._id && (
                <div className="absolute right-2 top-3.5 h-2 w-2 rounded-full bg-green-500 dark:bg-green-400" />
              )}
            <div className=" flex h-7 w-7 items-center justify-center rounded-full border border-border bg-base dark:border-borderDark dark:bg-baseDark">
              <div
                className={`flex items-center truncate text-xs font-bold ${initialsColor(
                  friend?.user?.name,
                )}`}
              >
                {initials(friend?.user?.name)}
              </div>
            </div>
            {friend?.user?.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
