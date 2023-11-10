import { openNotification } from "../../api/notification/notification";
import { useMutation, useQueryClient } from "react-query";

export const useOpenNotification = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(notificationId: string) => openNotification(notificationId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("user");
			},
		}
	);
};
