import { IconBeta, IconTrophyOff } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";

export const Trophies = ({
  currentUser,
  isPublic,
  height,
}: {
  currentUser: IUser;
  isPublic?: boolean;
  height?: string;
}) => {
  if (currentUser.role !== "beta-tester") {
    return (
      <section
        className={`flex w-full max-w-[24rem] grow flex-col items-center justify-center gap-2 rounded-lg  p-2  dark:bg-baseDarker ${height}`}
      >
        <IconTrophyOff size={50} className="text-yellow-500" />
        {isPublic ? (
          <p className="max-w-[16rem] text-center text-xs">
            This user has no trophies yet.
          </p>
        ) : (
          <p className="max-w-[16rem] text-center text-xs">
            You have no trophies yet. <br />
            Don't worry, you are sure to earn them as you use the platform
          </p>
        )}
      </section>
    );
  }
  return (
    <section
      className={`flex w-full max-w-[24rem] grow flex-col items-center justify-center gap-2 rounded-lg  p-2  dark:bg-baseDarker ${height}`}
    >
      <IconBeta size={50} className="text-yellow-500" />
      {isPublic ? (
        <p className="max-w-[16rem] text-center text-xs">
          This user was there from the beginning. <br />
          Thank you for being a beta tester 💖
        </p>
      ) : (
        <p className="max-w-[16rem] text-center text-xs">
          You were there from the beginning. <br />
          Thank you for being a beta tester 💖
        </p>
      )}
    </section>
  );
};
