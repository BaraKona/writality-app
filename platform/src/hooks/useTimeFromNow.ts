import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const useTimeFromNow = (date: string) => {
  return dayjs(date).fromNow();
};
