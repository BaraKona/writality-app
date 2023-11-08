import Pusher from "pusher-js";

export function initPusher() {
	const pusher = new Pusher(import.meta.env.VITE_API_PUSHER_KEY, {
		cluster: "eu",
	});
	return pusher;
}
