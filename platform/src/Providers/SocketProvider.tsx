import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { io, Socket } from "socket.io-client";
import Pusher, { Channel } from "pusher-js";

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
	const pusher = new Pusher("e8e5b489fee2211904ed", {
		cluster: "eu",
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
