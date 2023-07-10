import { Loader } from "@mantine/core";

export const MainLoader = () => {
	return (
		<div className="flex h-screen">
			<div className="m-auto flex flex-col items-center">
				<Loader variant="bars" color="#394251" />
				<p>
					<span className="font-bold">Loading</span> your account...
				</p>
			</div>
		</div>
	);
};
