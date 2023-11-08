import Pusher from "pusher";

export function initPusher() {
	const pusher = new Pusher({
		appId: "1702406",
		key: "e8e5b489fee2211904ed",
		secret: "e8b3177c356aa950f0c1",
		cluster: "eu",
		useTLS: true,
	});

	return pusher;
}
