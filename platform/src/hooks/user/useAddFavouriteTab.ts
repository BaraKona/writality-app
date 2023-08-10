import { useMutation, useQueryClient } from "react-query";
import { addbookmarks } from "../../api/user";
import { useToast } from "../useToast";

export const useAddFavouriteTab = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ type, url, name }: { type: string; url: string; name: string }) =>
			addbookmarks({
				type,
				url,
				name,
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
