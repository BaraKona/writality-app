import { removeBookmark } from "../../api/user";
import { useToast } from "../useToast";
import { useMutation, useQueryClient } from "react-query";

export const useRemoveBookmark = () => {
	const queryClient = useQueryClient();
	return useMutation(removeBookmark, {
		onSuccess: ({ message, url }) => {
			useToast("success", message);
			// instead of refetching the data, we can just remove the bookmark from the local cache.
			queryClient.setQueryData("user", (oldData: any) => {
				const newBookmarks = oldData.bookmarks.filter(
					(bookmark: any) => bookmark.url !== url
				);
				return {
					...oldData,
					bookmarks: newBookmarks,
				};
			});
		},
		onError: (err: Error) => {
			useToast("error", err.message);
		},
	});
};
