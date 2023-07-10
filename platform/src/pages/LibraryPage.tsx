import { Divider } from "@mantine/core";
import { LibraryProjects } from "../components/Library/LibraryProjects";
import { useUserProjects } from "../hooks/projects/useUserProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { useAddFavourite } from "../hooks/user/useAddFavourite";

export const LibraryPage = () => {
	const { currentUser } = useAuthContext();
	const { data: projects, isLoading } = useUserProjects();
	const { mutate } = useCreateProject();
	const { mutate: mutateFavourite } = useAddFavourite();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="h-[calc(100vh-3rem)] place-items-center rounded-t-md bg-white px-3 py-2 w-[calc(100vw-12rem)]">
			<div className="text-md font-bold">
				👋 Hey {currentUser.name} ! Welcome to your Library
			</div>
			<p className="text-sm">Welcome to your library!</p>
			<Divider className="my-2 border-gray-200" />
			<LibraryProjects
				projects={projects}
				createProject={mutate}
				addFavourite={mutateFavourite}
			/>
		</div>
	);
};
