import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Progress } from "@mantine/core";
export const DailyCount: FC<{}> = ({}) => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return null;
  }

  const dailyWordCount = currentUser?.dailyWordCount || 0;
  const dailyWordCountGoal = currentUser?.dailyWordCountGoal || 500;
  return (
    <div className="flex min-h-[4rem] shrink basis-40 flex-col justify-center gap-2 rounded-lg border border-border p-3 dark:border-none dark:bg-baseDarker">
      <div className="flex h-20 gap-2">
        <div className="flex grow flex-col gap-2 rounded-lg border border-border bg-base p-2 text-center text-sm  text-coolGrey-4 dark:border-borderDark dark:bg-baseDarker dark:text-coolGrey-6">
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {currentUser?.loginStreak}
          </p>
          {currentUser?.loginStreak === 1 ? "day" : "days"} in a row
        </div>
        <div className="flex grow flex-col gap-2 rounded-lg border border-border bg-base p-2 text-center text-sm  text-coolGrey-4 dark:border-borderDark dark:bg-baseDarker dark:text-coolGrey-6">
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {currentUser?.allTimeWordCount || 0}
          </p>
          total words written
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm text-coolGrey-5">
          Words written today: {dailyWordCount} / {dailyWordCountGoal}
        </div>
        <Progress
          size="lg"
          color="pink"
          value={
            dailyWordCount > dailyWordCountGoal
              ? 100
              : (dailyWordCount / dailyWordCountGoal) * 100
          }
          className="!border !border-border bg-base dark:!border-borderDark dark:!bg-baseDarker "
          classNames={{
            root: "dark:bg-baseDark",
          }}
        />
      </div>
    </div>
  );
};
