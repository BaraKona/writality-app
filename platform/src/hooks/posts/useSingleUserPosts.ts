import { useQuery } from "react-query";
import { getSingleUserPosts } from "../../api/posts";
import { useToast } from "../useToast";

export const useSingleUserPosts = (userId: string) => {
	return useQuery(["posts", userId], () => getSingleUserPosts(userId), {
		onError: () => {
			useToast("error", "Something went wrong, we could not get user's posts");
		},
	});
};
