import { Text } from "@mantine/core";
import { ProfileProjects } from "../components/Profile/ProfileProjects";
import { useUserProfileProjects } from "../hooks/projects/useUserProfileProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useAuthContext } from "../contexts/AuthContext";
import { useRemoveFavourite } from "../hooks/user/useRemoveFavouriteProject";
import { ProfilePosts } from "../components/Profile/ProfilePosts";
import { useUserPosts } from "../hooks/posts/useUserPosts";
import { useAddFavouriteTab } from "../hooks/user/useAddFavouriteTab";
import { DefaultProfileBanner } from "../assets/images";
import { BannerImage } from "../components/BannerImage";
import { Title } from "../components/Title";

export const ProfilePage = () => {
	const { currentUser } = useAuthContext();
	const { data: projects, isLoading } = useUserProfileProjects();
	const { data: posts, isLoading: postLoading } = useUserPosts();
	const { mutate } = useCreateProject();
	const { mutate: mutateFavourite } = useAddFavouriteTab();
	const { mutate: removeFavourite } = useRemoveFavourite();

	function greeting() {
		const today = new Date();
		const curHr = today.getHours();

		if (curHr < 12) {
			return "Good Morning";
		} else if (curHr < 18) {
			return "Good Afternoon";
		} else {
			return "Good Evening";
		}
	}

	return (
		<div className="flex flex-row gap-2">
			<div className="place-items-center rounded-md bg-base dark:bg-baseDark  flex-grow border-border dark:border-baseDark border overflow-y-auto h-[calc(100vh-3.2rem)]">
				<BannerImage
					image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Banner by Jez Timms on Unsplash"
				/>

				<div className="max-w-screen-lg mx-auto">
					<Title>
						{greeting()} {currentUser.name}!
					</Title>
					<div className="max-w-3xl flex flex-col">
						<p className="text-sm text-coolGrey-4 dark:text-coolGrey-3 -mt-4">
							"So here is why I write what I do: We all have futures. We all
							have pasts. We all have stories. And we all, every single one of
							us, no matter who we are and no matter what’s been taken from us
							or what poison we’ve internalized or how hard we’ve had to work to
							expel it –– we all get to dream."
						</p>
						<div>
							<Text
								weight={600}
								size="md"
								className="text-coolGrey-7 dark:text-pink-700 italic float-right"
							>
								- N. K. Jemisin
							</Text>
						</div>
					</div>

					<div className="py-2 rounded-md flex flex-col gap-2">
						<ProfileProjects
							projects={projects}
							createProject={mutate}
							addFavourite={mutateFavourite}
							removeFavourite={removeFavourite}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
			<div className="max-w-sm h-full">
				<ProfilePosts posts={posts} isLoading={postLoading} />
			</div>
		</div>
	);
};
