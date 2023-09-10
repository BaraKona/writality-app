import { Divider } from "@mantine/core";
import { usePublicUsers } from "../../hooks/user/usePublicUsers";
import {
	initGoogleAnalytics,
	sendEvent,
	messageSentEvent,
} from "../../utils/googleAnalytics";

export const UsersPage = () => {
	const { data: users } = usePublicUsers();
	let data: any = "Hello";
	data = 1;

	console.log(data);

	initGoogleAnalytics("G-K1KQ4J8062");
	return (
		<div className="h-[calc(100vh-2.7rem)] place-items-center rounded-normal border border-border bg-base px-3 py-2">
			<h1 className="text-md font-bold">Users</h1>
			<p className="text-sm">Welcome to the Users! {users && users.length}</p>
			<button
				className="rounded border border-border p-2"
				onClick={() => sendEvent(messageSentEvent)}
			>
				Send Message Event
			</button>
			<Divider my="xs" color="grey.0" />
		</div>
	);
};
