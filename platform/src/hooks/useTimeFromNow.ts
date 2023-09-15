import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const useTimeFromNow = (date: string | Date) => {
	return dayjs(date).fromNow();
};

export const useDefaultDate = (date: string | Date) => {
	return dayjs(date).format("MMM DD, YYYY");
};

export const useDefaultDateTime = (date: string | Date) => {
	return dayjs(date).format("MMM DD, YYYY hh:mm A");
};
