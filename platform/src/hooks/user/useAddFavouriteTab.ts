import { useMutation, useQueryClient } from "react-query";
import { addFavouriteTabs } from "../../api/user";
import { useToast } from "../useToast";

export const useAddFavouriteTab = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ type, url }: { type: string; url: string }) =>
			addFavouriteTabs({
				type,
				url,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("user");
			},
			onError: (err: any) => {
				useToast(
					"error",
					"Something went wrong, we could not add this tab to your favourites 😔"
				);
			},
		}
	);
};
