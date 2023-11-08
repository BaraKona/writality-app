import { getPost } from "../../api/posts";
import { useQuery, useQueryClient } from "react-query";
import { useSocket } from "../../Providers/SocketProvider";
export const useSinglePost = (postId: string) => {
	const { subscribeToChannel } = useSocket();
	const queryClient = useQueryClient();
	return useQuery(["post", postId], () => getPost(postId), {
		onSuccess: (data) => {
			const pusher = subscribeToChannel({ room: `post-${postId}` });

			pusher.bind("comments", () => {
				queryClient.invalidateQueries(["post", postId]);
			});
		},
	});
};
