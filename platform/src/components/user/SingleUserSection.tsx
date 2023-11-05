import { Tabs } from "@mantine/core";
import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
import { ProfileProjects } from "../Profile/ProfileProjects";
import { GridProjects } from "../Project/GridProjects";
import { NoChapters } from "../Chapters";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../Posts/PostCard";
import { useNavigate } from "react-router-dom";

export const SingleUserSection: FC<{
	projects?: IProject[];
	posts?: IPost[];
}> = ({ projects, posts }) => {
	if (!projects || !posts) {
		return null;
	}

	const navigate = useNavigate();

	return (
		<Tabs defaultValue="projects" keepMounted={false}>
			<Tabs.List className="!border-border !border-b dark:!border-borderDark">
				<Tabs.Tab
					value="projects"
					className="dark:!text-coolGrey-4 !font-semibold hover:!bg-coolGrey-1/10 !rounded-t-normal"
				>
					Projects
				</Tabs.Tab>
				<Tabs.Tab
					value="posts"
					className="dark:!text-coolGrey-4 !font-semibold hover:!bg-coolGrey-1/10 !rounded-t-normal "
				>
					Posts
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="projects" pt="xs">
				{projects.length === 0 ? (
					<NoChapters
						title="User has no public projects"
						p1="User has no projects"
					/>
				) : (
					<div className="flex gap-2 flex-wrap px-4">
						{projects.map((project) => (
							<GridProjects project={project} />
						))}
					</div>
				)}
			</Tabs.Panel>

			<Tabs.Panel value="posts" pt="xs">
				{posts.length === 0 ? (
					<NoChapters title="User has no posts" p1="User has no posts" />
				) : (
					<div className="flex gap-2 flex-wrap px-4 max-w-[700px] mx-auto ">
						{posts?.map((post) => (
							<PostCard
								post={post}
								openPost={() => navigate(`/posts/${post.uid}`)}
								style={"w-72"}
							/>
						))}
					</div>
				)}
			</Tabs.Panel>
		</Tabs>
	);
};
