import Pusher from "pusher-js";

// let pusher: Pusher;

export function initPusher() {
	const pusher = new Pusher(import.meta.env.VITE_API_PUSHER_KEY, {
		cluster: "eu",
	});

	return pusher;
}
