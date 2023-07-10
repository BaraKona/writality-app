import { addFavouriteProject } from "../../api/user";
import { useToast } from "../useToast";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { useUser } from "./useUser";

export const useAddFavourite = () => {
	const queryClient = useQueryClient();

	return useMutation(
		"addFavourite",
		(projectId: string) => addFavouriteProject(projectId),
		{
			onSuccess: () => {
				useToast("success", "Project added to favourites 😃");
				queryClient.invalidateQueries(["favourites"]);
				queryClient.invalidateQueries(["user"]);
			},
		}
	);
};
