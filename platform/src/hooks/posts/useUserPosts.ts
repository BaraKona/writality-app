import { useToast } from "../useToast";
import { getUserPosts } from "../../api/posts";
import { useQuery } from "react-query";

export const useUserPosts = () => {
	return useQuery("userPosts", () => getUserPosts(), {
		onError: () => {
			useToast("error", "Something went wrong, we could not get your posts 😔");
		},
	});
};
