import { getPost } from "../../api/posts";
import { useQuery } from "react-query";

export const useSinglePost = (postId: string) => {
	return useQuery(["post", postId], () => getPost(postId));
};
