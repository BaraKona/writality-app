import { createContext, useContext, ReactNode, useEffect } from "react";
import Pusher, { Channel } from "pusher-js";
import { initPusher } from "../api/external/pusher";
import { useQueryClient } from "react-query";

type SocketType = {
	subscribeToChannel: ({ room }: { room: string }) => Channel;
	listenToEvent: ({
		room,
		event,
		callback,
	}: {
		room: string;
		event: string;
		callback: () => void;
	}) => void;
};

const defaultSocket: SocketType = {
	subscribeToChannel: () => ({} as Channel),
	listenToEvent: () => {},
};

const SocketContext = createContext<SocketType>(defaultSocket);

export function useSocket() {
	return useContext(SocketContext);
}

export function SocketProvider({ children }: { children: ReactNode }) {
	let pusher = {} as Pusher;
	const queryClient = useQueryClient();
	/** @ts-ignore */
	const { data } = queryClient.getQueryState("user");
	useEffect(() => {
		pusher = initPusher();
		subscribeToChannel({ room: `user-${data.uid}` });
		pusher.bind("notification", () => {
			queryClient.invalidateQueries(["user"]);
		});
		return () => {
			pusher.disconnect();
		};
	});

	function subscribeToChannel({ room }: { room: string }) {
		return pusher.subscribe(room);
	}

	function listenToEvent({
		room,
		event,
		callback,
	}: {
		room: string;
		event: string;
		callback: () => void;
	}) {
		const channel = subscribeToChannel({ room });
		channel.bind(event, callback);
	}

	return (
		<SocketContext.Provider
			value={{
				subscribeToChannel,
				listenToEvent,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
}
