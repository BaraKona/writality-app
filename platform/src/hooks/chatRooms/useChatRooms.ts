import { useQuery, useQueryClient } from "react-query";
import { getProjectChat } from "../../api/chat/chats";

export const useChatRooms = (projectId: string) => {
	return useQuery(["chat", projectId], () => getProjectChat(projectId));
};
