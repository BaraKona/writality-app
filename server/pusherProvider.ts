import Pusher from "pusher";

export function initPusher() {
	const pusher = new Pusher({
		appId: "1702406",
		key: process.env.PUSHER_KEY,
		secret: process.env.PUSHER_SECRET,
		cluster: "eu",
		useTLS: true,
	});

	return pusher;
}
