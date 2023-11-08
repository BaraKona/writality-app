import { useMutation, useQueryClient } from "react-query";
import { postComment } from "../../api/posts";
import { useToast } from "..";
import { useSocket } from "../../Providers/SocketProvider";

export const useSendComment = (postId: string) => {
	const queryClient = useQueryClient();
	// const { sendUpdates } = useSocket();

	return useMutation((comment: string) => postComment(postId, comment), {
		onError: (error) => {
			useToast(
				"error",
				"Something went wrong, we could not post your comment 😔"
			);
			console.log(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["post", postId]);
			// sendUpdates({ name: "update-post", roomId: postId });
			useToast("success", "Your comment has been posted!");
		},
	});
};
