import { useToast } from "../useToast";
import { IPost } from "../../interfaces/IPost";
import { createPost } from "../../api/posts";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
export const useCreatePost = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mutation = useMutation(
		(post: IPost) =>
			createPost({
				postTitle: post.postTitle,
				projectTitle: post.projectTitle,
				description: post.description,
				genres: post.genres,
				postType: post.postType,
				collaborationType: post.collaborationType,
				collaboration: post.collaboration,
				color: post.color,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("posts");
				useToast("success", "New post created!");
				navigate("/posts");
			},
			onError: () => {
				useToast(
					"error",
					"Something went wrong, we could not create your post 😔"
				);
			},
		}
	);

	return mutation;
};
