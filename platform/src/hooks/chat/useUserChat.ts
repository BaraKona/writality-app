import { useQuery } from "react-query";
import { getUserChatById } from "../../api/chat/chats";

export const useUserChat = (chatId: string) => {
	return useQuery(["userChat", chatId], () => getUserChatById(chatId));
};
