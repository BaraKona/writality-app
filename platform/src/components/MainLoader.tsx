import { Loader } from "@mantine/core";

export const MainLoader = () => {
	return (
		<div className="flex h-screen">
			<div className="m-auto flex flex-col items-center">
				<Loader type="bars" color="#394251" size="sm" />
				<p>
					<span className="font-bold text-coolGrey-8">Loading</span> your
					account...
				</p>
			</div>
		</div>
	);
};
