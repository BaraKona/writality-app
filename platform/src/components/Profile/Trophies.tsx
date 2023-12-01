import { IconBeta, IconTrophyOff } from "@tabler/icons-react";
import { useAuthContext } from "../../contexts/AuthContext";

export const Trophies = () => {
  const { currentUser } = useAuthContext();

  if (currentUser.role === "beta-tester") {
    return (
      <section className="flex w-full max-w-[24rem] grow flex-col items-center justify-center gap-2 rounded-lg border border-border p-2 dark:border-none dark:bg-baseDarker">
        <IconTrophyOff size={100} className="text-yellow-500" />
        <p className="max-w-[16rem] text-center text-xs">
          You have no trophies yet. <br />
          Don't worry, you are sure to earn them as you use the platform
        </p>
      </section>
    );
  }
  return (
    <section className="flex w-full max-w-[24rem] grow flex-col items-center justify-center gap-2 rounded-lg border border-border p-2 dark:border-none dark:bg-baseDarker">
      <IconBeta size={100} className="text-yellow-500" />
      <p className="max-w-[14rem] text-center text-xs">
        You were there from the beginning. <br />
        Thank you for being a beta tester 💖
      </p>
    </section>
  );
};
