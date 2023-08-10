import { useToast } from "../useToast";
import { useMutation, useQueryClient } from "react-query";

import { removeFavouriteProject } from "../../api/user";

export const useRemoveFavourite = () => {
	const queryClient = useQueryClient();

	return useMutation(
		"removeFavourite",
		(projectId: string) => removeFavouriteProject(projectId),
		{
			onSuccess: () => {
				useToast("success", "Project removed from bookmarks 😃");
				queryClient.invalidateQueries(["bookmarks"]);
				queryClient.invalidateQueries(["user"]);
			},
		}
	);
};
