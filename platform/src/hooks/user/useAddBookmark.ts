import { useMutation, useQueryClient } from "react-query";
import { addbookmarks } from "../../api/user";
import { useToast } from "../useToast";

export const useAddBookmark = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ url, name, type }: { url: string; name: string; type: string }) =>
			addbookmarks({
				type,
				url,
				name,
			}),
		{
			onSuccess: ({ message, bookmark }) => {
				queryClient.setQueryData("user", (oldData: any) => {
					const newBookmarks = [...oldData.bookmarks, bookmark];
					return {
						...oldData,
						bookmarks: newBookmarks,
					};
				});

				useToast("success", message);
			},
			onError: (err: Error) => {
				useToast("error", err.message);
			},
		}
	);
};
