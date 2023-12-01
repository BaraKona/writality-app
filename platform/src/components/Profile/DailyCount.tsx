import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Progress } from "@mantine/core";
export const DailyCount: FC<{}> = ({}) => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return null;
  }

  const dailyWordCount = currentUser?.dailyWordCount || 0;
  const monthlyWordCount = currentUser?.monthlyWordCount || 0;
  const yearlyWordCount = currentUser?.yearlyWordCount || 0;
  return (
    <div className="flex min-h-[5rem] shrink basis-[16rem] flex-col justify-center gap-2">
      <div className="flex h-20 gap-2">
        <div className="flex grow flex-col gap-2 rounded-lg border border-border  p-2 text-center text-sm  text-coolGrey-4 dark:border-none dark:bg-baseDarker  dark:text-coolGrey-6">
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {currentUser?.loginStreak}
          </p>
          {currentUser?.loginStreak === 1 ? "day" : "days"} in a row
        </div>
        <div className="flex grow flex-col gap-2 rounded-lg border border-border  p-2 text-center text-sm  text-coolGrey-4 dark:border-none dark:bg-baseDarker dark:text-coolGrey-6">
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {currentUser?.allTimeWordCount || 0}
          </p>
          total words written
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" rounded-lg border border-border p-2 dark:border-none dark:bg-baseDarker">
          <div className="text-sm text-coolGrey-5">
            Words written today: {dailyWordCount} / {500}
          </div>
          <Progress
            size="lg"
            color="pink"
            value={dailyWordCount > 500 ? 100 : (dailyWordCount / 500) * 100}
            className="!border !border-border bg-base dark:!border-borderDark dark:!bg-baseDarker "
            classNames={{
              root: "dark:bg-baseDark",
            }}
          />
        </div>
        <div className=" rounded-lg border border-border p-2 dark:border-none dark:bg-baseDarker">
          <div className="text-sm text-coolGrey-5">
            Words written this month: {monthlyWordCount} / {10000}
          </div>
          <Progress
            size="lg"
            color="cyan"
            value={
              monthlyWordCount > 10000 ? 100 : (monthlyWordCount / 10000) * 100
            }
            className="!border !border-border bg-base dark:!border-borderDark dark:!bg-baseDarker "
            classNames={{
              root: "dark:bg-baseDark",
            }}
          />
        </div>
        <div className=" rounded-lg border border-border p-2 dark:border-none dark:bg-baseDarker">
          <div className="text-sm text-coolGrey-5">
            Words written this year: {yearlyWordCount} / {500000}
          </div>
          <Progress
            size="lg"
            color="indigo"
            value={
              yearlyWordCount > 500000 ? 100 : (yearlyWordCount / 500000) * 100
            }
            className="!border !border-border bg-base dark:!border-borderDark dark:!bg-baseDarker "
            classNames={{
              root: "dark:bg-baseDark",
            }}
          />
        </div>
      </div>
    </div>
  );
};
