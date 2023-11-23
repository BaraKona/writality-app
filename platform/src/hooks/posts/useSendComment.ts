import { useMutation, useQueryClient } from "react-query";
import { postComment } from "../../api/posts";
import { useToast } from "..";
import { useAuthContext } from "../../contexts/AuthContext";

export const useSendComment = (postId: string) => {
	const queryClient = useQueryClient();
	const { currentUser } = useAuthContext();

	return useMutation((comment: string) => postComment(postId, comment), {
		onError: (error) => {
			useToast(
				"error",
				"Something went wrong, we could not post your comment 😔"
			);
			console.log(error);
		},
		onSuccess: ({ message, comment }) => {
			queryClient.setQueryData(["post", postId], (oldData: any) => {
				const newComments = [
					...oldData.comments,
					{
						...comment,
						owner: currentUser,
					},
				];
				return {
					...oldData,
					comments: newComments,
				};
			});

			useToast("success", message);
		},
	});
};
