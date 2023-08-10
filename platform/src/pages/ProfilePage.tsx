import { Divider } from "@mantine/core";
import { ProfileProjects } from "../components/Profile/ProfileProjects";
import { useUserProjects } from "../hooks/projects/useUserProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { useAddFavourite } from "../hooks/user/useAddFavourite";
import { useRemoveFavourite } from "../hooks/user/useRemoveFavouriteProject";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { IconHome, IconUserCircle, IconUserCode } from "@tabler/icons-react";
import { ProfilePosts } from "../components/Profile/ProfilePosts";
import { useUserPosts } from "../hooks/posts/useUserPosts";
import { useAddFavouriteTab } from "../hooks/user/useAddFavouriteTab";
import { useDefaultDate, useTimeFromNow } from "../hooks/useTimeFromNow";
import { SmallText } from "../components/texts/SmallText";

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
		<div className=" place-items-center rounded-normal bg-secondary border-border border px-3 py-3 h-[calc(100vh-2.7rem)]">
			<h1 className="text-md font-bold">Welcome {currentUser.name}</h1>
			<p className="text-sm"></p>
			<Divider my="xs" color="grey.0" />
			<div className="grid grid-cols-2 gap-2">
				<section>
					<div>
						<SmallText>Member since: </SmallText>
						<SmallText light className="px-2">
							{useDefaultDate(currentUser.createdAt)}
						</SmallText>
					</div>
					<div className="my-2">
						<SmallText>Email:</SmallText>
						<SmallText light className="px-2">
							{currentUser?.email}
						</SmallText>
					</div>
					<div className="my-2">
						<SmallText>About me:</SmallText>
						<SmallText
							light
							className=" h-44 overflow-y-auto rounded-normal border border-border p-2"
						>
							{currentUser?.aboutMe} || empty{" "}
						</SmallText>
					</div>
				</section>
				<div className="bg-primary p-2 rounded-normal">
					<ProfileProjects
						projects={projects}
						createProject={mutate}
						addFavourite={mutateFavourite}
						removeFavourite={removeFavourite}
						isLoading={isLoading}
					/>
					<Divider my={4} color="grey.0" />
					<ProfilePosts posts={posts} isLoading={postLoading} />
				</div>
			</div>
		</div>
	);
};
