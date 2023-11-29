import { useQuery, useQueryClient } from "react-query";
import { getUserChatById } from "../../api/chat/chats";
import { IUser } from "../../interfaces/IUser";

export const useUserChat = (chatId: string) => {
	const queryClient = useQueryClient();
	return useQuery(["userChat", chatId], () => getUserChatById(chatId), {
		enabled: !!chatId,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], (oldData: any) => {
				const newFriends = oldData.friends.map(
					(friend: IUser["friends"][0]) => {
						if (friend.chat._id === chatId) {
							friend.chat.users = data.users;
						}
						return friend;
					}
				);
				return {
					...oldData,
					friends: newFriends,
				};
			});
		},
	});
};
