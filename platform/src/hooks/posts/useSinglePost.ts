import { getPost } from "../../api/posts";
import { useQuery } from "react-query";
import { useSocket } from "../../Providers/SocketProvider";
export const useSinglePost = (postId: string) => {
	const { joinRoom } = useSocket();
	return useQuery(["post", postId], () => getPost(postId), {
		onSuccess: () => {
			joinRoom({
				name: "join-post-chat",
				roomId: postId,
				callback: () => console.log("joined post chat"),
			});
		},
	});
};
