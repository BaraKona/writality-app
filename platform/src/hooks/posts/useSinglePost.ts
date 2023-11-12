import { getPost } from "../../api/posts";
import { useQuery, useQueryClient } from "react-query";
import { useSocket } from "../../Providers/SocketProvider";
export const useSinglePost = (postId: string) => {
	const queryClient = useQueryClient();

	return useQuery(["post", postId], () => getPost(postId), {
		onSuccess: (data) => {},
	});
};
