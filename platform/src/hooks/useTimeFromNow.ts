import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const useTimeFromNow = (date: string) => {
	return dayjs(date).fromNow();
};

export const useDefaultDate = (date: string) => {
	return dayjs(date).format("MMM DD, YYYY");
};
