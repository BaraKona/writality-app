import { useMutation, useQueryClient } from "react-query";
import { updateUserData } from "../../api/user";
import { IUser } from "../../interfaces/IUser";
import { useToast } from "../useToast";

export const useUpdateUserData = () => {
	const queryClient = useQueryClient();

	return useMutation((user: IUser) => updateUserData(user), {
		onSuccess: () => {
			queryClient.invalidateQueries("user");
			useToast("success", "User data updated successfully");
		},
		onError: (err: any) => {
			useToast("error", err.message);
		},
	});
};
