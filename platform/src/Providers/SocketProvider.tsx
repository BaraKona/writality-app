import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from "react";
import Pusher, { Channel } from "pusher-js";
import { initPusher } from "../api/external/pusher";
import { useQueryClient } from "react-query";

type SocketType = {
	// subscribeToChannel: ({ room }: { room: string }) => Channel;
	// listenToEvent: ({
	// 	room,
	// 	event,
	// 	callback,
	// }: {
	// 	room: string;
	// 	event: string;
	// 	callback: () => void;
	// }) => void;
	// disconnect: () => void;
	pusher: Pusher | null;
};

const defaultSocket: SocketType = {
	// subscribeToChannel: () => ({} as Channel),
	// listenToEvent: () => {},
	// disconnect: () => {},
	pusher: null,
};

const SocketContext = createContext<SocketType>(defaultSocket);

export function useSocket() {
	return useContext(SocketContext);
}

export function SocketProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();
	/** @ts-ignore */
	const { data: user } = queryClient.getQueryState("user");
	const [pusher, setPusher] = useState<Pusher | null>(null);
	// useEffect(() => {
	// 	var pusher = initPusher();
	// 	subscribeToChannel({ room: `user-${data.uid}` });
	// 	pusher.bind("notification", () => {
	// 		queryClient.invalidateQueries(["user"]);
	// 	});
	// 	return () => {
	// 		pusher.disconnect();
	// 		pusher.unsubscribe(`user-${data.uid}`);
	// 	};
	// }, [data]);

	// function subscribeToChannel({ room }: { room: string }) {
	// 	return pusher.subscribe(room);
	// }

	// function listenToEvent({
	// 	room,
	// 	event,
	// 	callback,
	// }: {
	// 	room: string;
	// 	event: string;
	// 	callback: () => void;
	// }) {
	// 	const channel = subscribeToChannel({ room });
	// 	if (channel) channel.bind(event, callback);
	// }

	// function disconnect() {
	// 	if (pusher) pusher.disconnect();
	// }

	useEffect(() => {
		if (!user) return;

		const pusher = initPusher();
		setPusher(pusher);

		const channel = pusher.subscribe(`user-${user.uid}`);
		channel.bind("notification", () => {
			queryClient.invalidateQueries(["user"]);
		});

		// return () => {
		// 	pusher.disconnect();
		// 	pusher.unsubscribe(`user-${user.uid}`);
		// 	pusher.unbind_all();
		// };
	}, [user]);

	return (
		<SocketContext.Provider
			value={{
				// subscribeToChannel,
				// listenToEvent,
				// disconnect,
				pusher,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
}
