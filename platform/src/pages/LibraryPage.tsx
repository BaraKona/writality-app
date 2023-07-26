import { Divider } from "@mantine/core";
import { LibraryProjects } from "../components/Library/LibraryProjects";
import { useUserProjects } from "../hooks/projects/useUserProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { useAddFavourite } from "../hooks/user/useAddFavourite";
import { useRemoveFavourite } from "../hooks/user/useRemoveFavouriteProject";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { IconHome } from "@tabler/icons";
import { LibraryPosts } from "../components/Library/LibraryPosts";
import { useUserPosts } from "../hooks/posts/useUserPosts";

export const LibraryPage = () => {
	const { currentUser } = useAuthContext();
	const { data: projects, isLoading } = useUserProjects();
	const { data: posts, isLoading: postLoading } = useUserPosts();
	const { mutate } = useCreateProject();
	const { mutate: mutateFavourite } = useAddFavourite();
	const { mutate: removeFavourite } = useRemoveFavourite();

	const breadcrumbs = [
		{
			label: `Hey ${currentUser.name} ! Welcome to your Library`,
			path: "/",
			icon: <IconHome size={18} />,
		},
	];

	return (
		<div className="w-[calc(100vw-14rem)] place-items-center rounded-normal bg-secondary px-3 py-3 h-[calc(100vh-2.7rem)]">
			<div className="text-sm font-bold">
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<Divider className="my-2 border-border" />
			<LibraryProjects
				projects={projects}
				createProject={mutate}
				addFavourite={mutateFavourite}
				removeFavourite={removeFavourite}
				isLoading={isLoading}
			/>
			<Divider className="my-2 border-border" />
			<LibraryPosts posts={posts} isLoading={postLoading} />
			<Divider className="my-2 border-border" />
		</div>
	);
};
