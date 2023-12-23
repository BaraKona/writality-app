import { FC } from "react";
import { BannerImage } from "../../components/BannerImage";
import { useSingleUser } from "../../hooks/public/useSingleUser";
import { useNavigate, useParams } from "react-router-dom";
import { initials, initialsColor } from "../../utils/userIcons";
import { UserCountryRenderer } from "../../components/UserCountryRenderer";
import { ReadMoreText } from "../../components/ReadMoreText";
import { IconChevronLeft, IconMessage, IconUserPlus } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { SingleUserSection } from "../../components/user/SingleUserSection";
import { useSingleUserProjects } from "../../hooks/public/usePublicUserProject";
import { useSingleUserPosts } from "../../hooks/posts/useSingleUserPosts";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSendFriendRequest } from "../../hooks/notification/useSendFriendRequest";
import { BetaIcon } from "../../components/BetaIcon";
import { Trophies } from "../../components/Profile/Trophies";
import { useDefaultDate } from "../../hooks/useTimeFromNow";
import { useLocalStorage } from "@mantine/hooks";
import { ProfileFriends } from "../../components/Profile/ProfileFriends";

export const SingleUserPage: FC<{}> = () => {
  const { userId } = useParams();
  const { currentUser } = useAuthContext();
  const { data: user } = useSingleUser(userId as string);
  const { data: projects } = useSingleUserProjects(userId as string);
  const { data: posts } = useSingleUserPosts(userId as string);

  const { mutate: sendFriendRequest } = useSendFriendRequest();

  const maxTextLength = 800;
  const navigate = useNavigate();

  const [userChat, setUserChat] = useLocalStorage({
    key: "userChat",
  });

  if (!user) {
    return null;
  }

  function renderButton() {
    const isFriend = currentUser?.friends?.some(
      // @ts-ignore
      (friend: IUser["friends"][0]) => friend?.user._id === user._id,
    );
    const isUser = currentUser._id === user?._id;
    return !isFriend && !isUser;
  }

  return (
    <section className="relative overflow-y-auto rounded-lg">
      <BannerImage
        image="https://images.unsplash.com/photo-1502485019198-a625bd53ceb7"
        alt="Post banner"
        styling="rounded-b-none"
        height="h-[20rem] "
      />
      <button
        className="absolute left-2 top-2 rounded-lg border border-border bg-base p-1.5 hover:bg-gray-100 dark:border-borderDark dark:bg-baseDark dark:hover:bg-hoverDark"
        onClick={() => navigate("/users")}
      >
        <IconChevronLeft size={18} />
      </button>

      <section className="relative mx-auto -mt-[20rem] flex h-[20rem] w-full max-w-sm flex-col items-center justify-center gap-3">
        {user?.role === "beta-tester" && <BetaIcon size={24} />}
        <div className="mx-auto flex h-32 w-32 border-spacing-1 items-center justify-center rounded-full border-[6px] border-dashed border-emerald-600 dark:border-base">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-base/80 bg-blend-darken dark:bg-baseDark">
            <div className={`-mt-1 truncate text-4xl font-bold ${initialsColor(user?.name)}`}>
              {initials(user?.name)}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end text-coolGrey-4">
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <UserCountryRenderer country={user?.country} />
        </div>
      </section>
      <section
        className={`flex h-20 items-center gap-10 rounded-b-lg rounded-bl-lg
         bg-slate-700 px-16 dark:bg-baseDarker`}
      >
        <div className="flex flex-col items-center text-sm">
          <p className="text-coolGrey-4">Member since:</p>
          <p className="text-base font-bold">{useDefaultDate(user?.createdAt)}</p>
        </div>
        <div className="flex flex-col items-center text-sm">
          <p className="text-coolGrey-4">Last seen</p>
          <p className="text-base font-bold">
            {user.loginDates && user.loginDates.length > 0
              ? useDefaultDate(user?.loginDates[user?.loginDates.length - 1]?.date)
              : "never"}
          </p>
        </div>
        <div className="flex flex-col items-center text-sm">
          <p className="text-coolGrey-4">Streak</p>
          <p className="text-base font-bold">{user?.loginStreak}</p>
        </div>
        <div className="flex flex-col items-center text-sm">
          <p className="text-coolGrey-4">Words written</p>
          <p className="text-base font-bold">{user?.allTimeWordCount}</p>
        </div>
        <div className="flex flex-col items-center text-sm">
          <p className="text-coolGrey-4">Projects</p>
          <p className="text-base font-bold">{projects?.length}</p>
        </div>
        <div className="flex flex-col items-center text-sm">
          <p className="text-coolGrey-4">Posts</p>
          <p className="text-base font-bold">{posts?.length}</p>
        </div>

        {renderButton() ? (
          <button
            className="ml-auto flex items-center gap-2 rounded-lg bg-green-500 p-1.5 px-4 text-sm font-semibold hover:bg-gray-100 dark:bg-green-700 dark:text-baseDarker dark:hover:bg-green-800"
            onClick={() => sendFriendRequest(user?.uid)}
          >
            <IconUserPlus size={18} /> Add friend
          </button>
        ) : (
          <button
            className="ml-auto flex items-center gap-2 rounded-lg bg-green-500 p-1.5 px-4 text-sm font-semibold hover:bg-gray-100 dark:bg-green-700 dark:text-baseDarker dark:hover:bg-green-800"
            onClick={() =>
              setUserChat(
                `${currentUser?.friends?.find(
                  // @ts-ignore
                  (friend: IUser["friends"][0]) => friend?.user._id === user._id,
                )?.chat._id}`,
              )
            }
          >
            <IconMessage size={18} /> Send message
          </button>
        )}
      </section>

      <section className="flex-w]rap mx-auto mt-2 flex max-w-screen-2xl px-6">
        <div className="flex w-80 flex-col gap-4 self-start">
          <div className="rounded-lg border border-border dark:border-none dark:bg-baseDarker">
            <Trophies currentUser={user} isPublic height="h-[14rem]" />
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border p-4 dark:border-none dark:bg-baseDarker">
            <h2 className="text-sm font-bold">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user?.interests.length === 0 ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <span className="flex items-center justify-center rounded-lg bg-coolGrey-1 p-1.5 px-4  text-center text-sm capitalize dark:bg-coolGrey-8/60">
                      no interests
                    </span>
                  ))}
                </>
              ) : (
                <>
                  {user?.interests.map((interest: IUser["interests"]) => (
                    <span className="flex items-center justify-center rounded-lg bg-orange-300 p-1.5 px-4 text-center text-sm capitalize dark:bg-orange-900">
                      {interest}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border p-4 dark:border-none dark:bg-baseDarker">
            <h2 className="text-sm font-bold">Roles</h2>
            <div className="flex flex-wrap gap-2">
              {user?.roles?.length === 0 ? (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <span className="flex items-center justify-center rounded-lg bg-coolGrey-1 p-1.5 px-4 text-center text-sm capitalize dark:bg-coolGrey-8/60">
                      no roles
                    </span>
                  ))}
                </>
              ) : (
                <>
                  {user.roles.map((role: IUser["roles"]) => (
                    <span className="flex items-center justify-center rounded-lg bg-rose-400 p-1.5 px-4  text-center text-sm capitalize dark:bg-pink-950">
                      {role}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-1/2 relative grow basis-[30rem]  px-4 pb-6 ">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <div>
                <h2 className=" font-bold">Bio</h2>
                <ReadMoreText
                  text={user?.aboutMe}
                  maxTextLength={maxTextLength}
                  errorText="This user has not written anything about themselves yet."
                />
              </div>
            </div>
            <SingleUserSection projects={projects} posts={posts} />
          </div>
        </div>

        <div className="w-80 self-start rounded-lg border border-border dark:border-none dark:bg-baseDarker">
          <ProfileFriends user={user} />
        </div>
      </section>
    </section>
  );
};
