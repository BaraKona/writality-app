import { Divider } from "@mantine/core";
import { ProfileProjects } from "../components/Profile/ProfileProjects";
import { useUserProjects } from "../hooks/projects/useUserProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { useRemoveFavourite } from "../hooks/user/useRemoveFavouriteProject";
import { IconHome, IconUserCircle, IconUserCode } from "@tabler/icons-react";
import { ProfilePosts } from "../components/Profile/ProfilePosts";
import { useUserPosts } from "../hooks/posts/useUserPosts";
import { useAddFavouriteTab } from "../hooks/user/useAddFavouriteTab";
import { DefaultProfileBanner } from "../assets/images";
import { BannerImage } from "../components/BannerImage";
import { Title } from "../components/Title";

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
			icon: <IconUserCircle size={18} />,
		},
	];

	return (
		<div className="place-items-center rounded-normal bg-base">
			<BannerImage
				image={DefaultProfileBanner}
				alt="Banner by Jez Timms on Unsplash"
			/>

			<div className="max-w-screen-lg mx-auto">
				<Title>Welcome {currentUser.name}</Title>
				<div className="p-2 rounded-normal flex flex-col gap-2">
					<ProfileProjects
						projects={projects}
						createProject={mutate}
						addFavourite={mutateFavourite}
						removeFavourite={removeFavourite}
						isLoading={isLoading}
					/>
					<ProfilePosts posts={posts} isLoading={postLoading} />
				</div>
			</div>
		</div>
	);
};