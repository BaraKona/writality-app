import { useMutation, useQueryClient } from "react-query";
import { addbookmarks } from "../../api/user";
import { useToast } from "../useToast";

export const useAddFavouriteTab = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ url, name }: { url: string; name: string }) =>
			addbookmarks({
				type: "post",
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
