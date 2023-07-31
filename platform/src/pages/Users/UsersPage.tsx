import { Divider } from "@mantine/core";
import { usePublicUsers } from "../../hooks/user/usePublicUsers";

export const UsersPage = () => {
	const { data: users } = usePublicUsers();

	return (
		<div className="h-[calc(100vh-2.7rem)] place-items-center rounded-normal border border-border bg-secondary px-3 py-2">
			<h1 className="text-md font-bold">Users</h1>
			<p className="text-sm">Welcome to the Users! {users && users.length}</p>
			<Divider my="xs" color="grey.0" />
		</div>
	);
};
