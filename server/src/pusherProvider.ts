import Pusher from "pusher";

export function initPusher() {
	let pusher = null;
	try {
		pusher = new Pusher({
			appId: "1702406",
			key: process.env.PUSHER_KEY,
			secret: process.env.PUSHER_SECRET,
			cluster: "eu",
			useTLS: true,
		});
	} catch (err) {
		console.log(err);
		return null;
	}

	return pusher;
}
