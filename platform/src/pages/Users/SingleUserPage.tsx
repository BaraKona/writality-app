import { FC } from "react";
import { BannerImage } from "../../components/BannerImage";
import { useSingleUser } from "../../hooks/public/useSingleUser";
import { useNavigate, useParams } from "react-router-dom";
import { initials, initialsColor } from "../../utils/userIcons";
import { UserCountryRenderer } from "../../components/UserCountryRenderer";
import { ReadMoreText } from "../../components/ReadMoreText";
import { IconChevronLeft, IconClock, IconUserPlus } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { SingleUserSection } from "../../components/user/SingleUserSection";
import { useSingleUserProjects } from "../../hooks/public/usePublicUserProject";
import { useSingleUserPosts } from "../../hooks/posts/useSingleUserPosts";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSendFriendRequest } from "../../hooks/notification/useSendFriendRequest";
import { BetaIcon } from "../../components/BetaIcon";

export const SingleUserPage: FC<{}> = () => {
  const { userId } = useParams();
  const { currentUser } = useAuthContext();
  const { data: user } = useSingleUser(userId as string);
  const { data: projects } = useSingleUserProjects(userId as string);
  const { data: posts } = useSingleUserPosts(userId as string);

  const { mutate: sendFriendRequest } = useSendFriendRequest();

  const maxTextLength = 400;
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  function renderButton() {
    const isFriend = currentUser?.friends?.some(
      (friend: IUser["friends"][0]) => friend?.user._id === user._id,
    );
    const isUser = currentUser._id === user?._id;
    return !isFriend && !isUser;
  }

  return (
    <section className="relative overflow-y-auto rounded-lg">
      <BannerImage
        image="https://images.unsplash.com/photo-1544604860-206456f08229"
        alt="Post banner"
        styling="rounded-br-none"
      />

      <button
        className="absolute left-2 top-2 rounded-lg border border-border bg-base p-1.5 hover:bg-gray-100 dark:border-borderDark dark:bg-baseDark dark:hover:bg-hoverDark"
        onClick={() => navigate("/users")}
      >
        <IconChevronLeft size={18} />
      </button>
      <div className="absolute left-16 top-[10rem] flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-base !bg-coolGrey-2/70 dark:border-baseDark dark:!bg-coolGrey-5/70 dark:bg-borderDark">
        <div
          className={`-mt-1 truncate text-4xl font-bold ${initialsColor(
            user?.name,
          )}`}
        >
          {initials(user?.name)}
        </div>
      </div>

      <div className="flex w-full">
        <div className="relative w-1/2 grow border-r border-border px-16 pb-6 dark:border-borderDark">
          <div className="absolute right-4 top-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <IconClock size={20} /> Member since:{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </div>
            {renderButton() && (
              <button
                className=" self-end rounded-lg p-1.5 hover:bg-gray-100 dark:bg-fuchsia-800/70 dark:hover:bg-fuchsia-800"
                onClick={() => sendFriendRequest(user?.uid)}
              >
                <IconUserPlus size={20} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="mt-20 flex flex-col">
              <h2 className="flex items-center gap-2 text-4xl font-bold text-coolGrey-8 dark:text-coolGrey-2">
                {user.name}
                {user?.role === "beta-tester" && <BetaIcon size={24} />}
              </h2>
              {/* <p>{user.email}</p> */}
              <UserCountryRenderer country={user?.country} />
            </div>
            <h2 className="my-4 font-bold">Bio</h2>
            <ReadMoreText
              text={user?.aboutMe}
              maxTextLength={maxTextLength}
              errorText="This user has not written anything about themselves yet."
            />
            <SingleUserSection projects={projects} posts={posts} />
          </div>
        </div>
        <section className="flex">
          <div className="flex min-h-[693px] w-1/2 flex-col border-border pt-2 transition-all duration-300 ease-in-out dark:border-borderDark">
            <h2 className="my-4 font-bold">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.length === 0 && (
                <>
                  {[1, 2, 3].map((i) => (
                    <span className="flex h-24 w-24 items-center justify-center rounded-lg bg-coolGrey-1 p-2 text-center text-sm capitalize dark:bg-coolGrey-8/60">
                      no interests
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest: IUser["interests"]) => (
                <span className="flex  h-24 w-24 items-center justify-center rounded-lg bg-orange-300 p-2 text-center text-sm capitalize dark:bg-orange-900">
                  {interest}
                </span>
              ))}
            </div>
            <h2 className="my-4 font-bold">Roles</h2>
            <div className="flex flex-wrap gap-2">
              {user?.roles?.length === 0 && (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <span className="flex h-24 w-24 items-center justify-center rounded-lg bg-coolGrey-1 p-2 text-center text-sm capitalize dark:bg-coolGrey-8/60">
                      no roles
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {user.roles.map((role: IUser["roles"]) => (
                <span className="flex h-24 w-24 items-center justify-center rounded-lg bg-rose-400 p-2 text-center text-sm capitalize dark:bg-pink-950">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
