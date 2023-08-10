import { Divider } from "@mantine/core";
import { ProfileProjects } from "../components/Profile/ProfileProjects";
import { useUserProjects } from "../hooks/projects/useUserProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { useAddFavourite } from "../hooks/user/useAddFavourite";
import { useRemoveFavourite } from "../hooks/user/useRemoveFavouriteProject";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { IconHome } from "@tabler/icons-react";
import { ProfilePosts } from "../components/Profile/ProfilePosts";
import { useUserPosts } from "../hooks/posts/useUserPosts";
import { useAddFavouriteTab } from "../hooks/user/useAddFavouriteTab";

export const ProfilePage = () => {
	const { currentUser } = useAuthContext();
	const { data: projects, isLoading } = useUserProjects();
	const { data: posts, isLoading: postLoading } = useUserPosts();
	const { mutate } = useCreateProject();
	const { mutate: mutateFavourite } = useAddFavouriteTab();
	const { mutate: removeFavourite } = useRemoveFavourite();

	const breadcrumbs = [
		{
			label: `Hey ${currentUser.name} ! Welcome to your Profile`,
			path: "/",
			icon: <IconHome size={18} />,
		},
	];

	return (
		<div className=" place-items-center rounded-normal bg-secondary border-border border px-3 py-3 h-[calc(100vh-2.7rem)]">
			<div className="text-sm font-bold">
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<Divider my="xs" color="grey.0" />
			<ProfileProjects
				projects={projects}
				createProject={mutate}
				addFavourite={mutateFavourite}
				removeFavourite={removeFavourite}
				isLoading={isLoading}
			/>
			<Divider my="xs" color="grey.0" />
			<ProfilePosts posts={posts} isLoading={postLoading} />
			<Divider my="xs" color="grey.0" />
		</div>
	);
};
