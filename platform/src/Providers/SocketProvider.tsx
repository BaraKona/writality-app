import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { io, Socket } from "socket.io-client";

type SocketType = {
	socket: Socket;
	joinRoom: ({
		name,
		roomId,
		callback,
	}: {
		name: string;
		roomId: string;
		callback: (message: string) => void;
	}) => void;
	listenForUpdates: ({
		name,
		message,
		callback,
	}: {
		name: string;
		message: string;
		callback: (message: string) => void;
	}) => void;
	sendUpdates: ({ name, roomId }: { name: string; roomId: string }) => void;
};

const defaultSocket: SocketType = {
	socket: io(import.meta.env.VITE_API_URL, {
		withCredentials: true,
	}),
	joinRoom: ({
		name,
		roomId,
		callback,
	}: {
		name: string;
		roomId: string;
		callback: (message: string) => void;
	}) => {},
	listenForUpdates: ({
		name,
		message,
		callback,
	}: {
		name: string;
		message: string;
		callback: (message: string) => void;
	}) => {},
	sendUpdates: ({ name, roomId }: { name: string; roomId: string }) => {},
};

const SocketContext = createContext<SocketType>(defaultSocket);

export function useSocket() {
	return useContext(SocketContext);
}

export function SocketProvider({ children }: { children: ReactNode }) {
	const socket = io(import.meta.env.VITE_API_URL, {
		withCredentials: true,
	});

	function joinRoom({
		name,
		roomId,
		callback,
	}: {
		name: string;
		roomId: string;
		callback: (message: string) => void;
	}) {
		socket.emit(name, roomId, callback);
	}

	function listenForUpdates({
		name,
		message,
		callback,
	}: {
		name: string;
		message: string;
		callback: (message: string) => void;
	}) {
		socket.off(name).on(name, callback);
	}

	function sendUpdates({ name, roomId }: { name: string; roomId: string }) {
		socket.emit(name, roomId);
		socket.disconnect();
	}

	return (
		<SocketContext.Provider
			value={{
				socket,
				joinRoom,
				listenForUpdates,
				sendUpdates,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
}
