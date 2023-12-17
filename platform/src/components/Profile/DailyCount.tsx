import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Progress } from "@mantine/core";
import { IconFlame, IconLanguage } from "@tabler/icons-react";
export const DailyCount: FC<{}> = ({}) => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return null;
  }

  const dailyWordCount = currentUser?.dailyWordCount || 0;
  const monthlyWordCount = currentUser?.monthlyWordCount || 0;
  const yearlyWordCount = currentUser?.yearlyWordCount || 0;

  return (
    <div className="flex min-h-[5rem] shrink basis-[10rem] flex-col justify-center gap-2">
      <div className="flex h-12 gap-2">
        <div className="flex grow flex-col rounded-lg p-1 text-center text-xs dark:border-none dark:bg-baseDarker  dark:text-coolGrey-6">
          <p className="flex items-center justify-center text-lg font-semibold text-orange-600 dark:text-orange-400">
            {currentUser?.loginStreak} <IconFlame size={20} />
          </p>
          days
        </div>
        <div className="flex grow flex-col rounded-lg p-1 text-center text-xs dark:border-none dark:bg-baseDarker dark:text-coolGrey-6">
          <p className="flex items-center justify-center text-lg font-semibold text-gray-600 dark:text-gray-400">
            {currentUser?.allTimeWordCount || 0} <IconLanguage size={20} />
          </p>
          words
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="rounded-lg p-1 dark:border-none dark:bg-baseDarker">
          <div className="text-xs">
            Words written today: {dailyWordCount} / {500}
          </div>
          <Progress
            size="md"
            value={dailyWordCount > 500 ? 100 : (dailyWordCount / 500) * 100}
            className="!border-none !border-border bg-base dark:!border-borderDark dark:!bg-baseDark "
            classNames={{
              root: "dark:bg-baseDark",
              bar: "dark:!bg-emerald-400 !bg-coolGrey-7",
            }}
          />
        </div>
        <div className=" rounded-lg p-1 dark:border-none dark:bg-baseDarker">
          <div className="text-xs ">
            Words written this month: {monthlyWordCount} / {15000}
          </div>
          <Progress
            size="md"
            value={
              monthlyWordCount > 15000 ? 100 : (monthlyWordCount / 15000) * 100
            }
            className="!border-none !border-border bg-base dark:!border-borderDark dark:!bg-baseDark "
            classNames={{
              root: "dark:bg-baseDark",
              bar: "dark:!bg-emerald-400 !bg-coolGrey-7 ",
            }}
          />
        </div>
        <div className=" rounded-lg p-1 dark:border-none dark:bg-baseDarker">
          <div className="text-xs ">
            Words written this year: {yearlyWordCount} / {200000}
          </div>
          <Progress
            size="md"
            value={
              yearlyWordCount > 200000 ? 100 : (yearlyWordCount / 200000) * 100
            }
            className="!border-none !border-border bg-base dark:!border-borderDark dark:!bg-baseDark "
            classNames={{
              root: "dark:bg-baseDark",
              bar: "dark:!bg-emerald-400 !bg-coolGrey-7",
            }}
          />
        </div>
      </div>
    </div>
  );
};
