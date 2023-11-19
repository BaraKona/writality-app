import { commentOnChat } from "../../api/chat/chats";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
export const useComment = (projectId: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		async (item: { chatId: string; comment: string }) => {
			const data = await commentOnChat(projectId, item.chatId, item.comment);
			return data;
		},
		{
			onSuccess: () => {
				useToast("success", "Comment added! 😎");
				queryClient.invalidateQueries(["chat", projectId]);
				queryClient.invalidateQueries(["userChat", projectId]);
			},
		}
	);
};
