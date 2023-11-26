import { Tabs } from "@mantine/core";
import { FC } from "react";
import { IProject } from "../../interfaces/IProject";
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
		<Tabs
			defaultValue="projects"
			keepMounted={false}
			className="border-none important:border-none w-full !pl-2 !flex !flex-col !grow !pt-2"
		>
			<Tabs.List className="flex !items-center !border-none !gap-2 !mb-2 !grow-0">
				<div className="flex gap-2 bg-coolGrey-1 dark:bg-hoverDark p-1.5 rounded-lg">
					<Tabs.Tab
						value="projects"
						className="!p-1.5 font-semibold !px-3 !text-coolGrey-6 dark:!text-coolGrey-4 hover:!bg-coolGrey-7 hover:!text-coolGrey-1 dark:hover:!bg-purple-800/50 transition-all ease-in-out duration-300 !rounded-lg !border-none data-[active]:!bg-coolGrey-7 dark:data-[active]:!text-coolGrey-1 dark:data-[active]:!bg-purple-800 data-[active]:!text-coolGrey-1"
					>
						Projects
					</Tabs.Tab>
					<Tabs.Tab
						value="posts"
						className="!p-1.5 font-semibold !px-3 !text-coolGrey-6 dark:!text-coolGrey-4 hover:!bg-coolGrey-7 hover:!text-coolGrey-1 dark:hover:!bg-purple-800/50 transition-all ease-in-out duration-300 !rounded-lg !border-none data-[active]:!bg-coolGrey-7 dark:data-[active]:!text-coolGrey-1 dark:data-[active]:!bg-purple-800 data-[active]:!text-coolGrey-1 "
					>
						Posts
					</Tabs.Tab>
				</div>
			</Tabs.List>

			<Tabs.Panel
				value="projects"
				pt="xs"
				className="dark:bg-baseDarker/70 dark:border-l-black/70 bg-coolGrey-1 !rounded-md py-2 flex !grow"
			>
				{projects.length === 0 ? (
					<NoChapters
						title="User has no public projects"
						p1="This user does not have any public projects. If you know them, you can still send them a message"
					/>
				) : (
					<div className="flex gap-2 flex-wrap px-2 flex-row content-start">
						{projects.map((project) => (
							<GridProjects project={project} />
						))}
					</div>
				)}
			</Tabs.Panel>

			<Tabs.Panel
				value="posts"
				pt="xs"
				className="dark:bg-baseDarker/70 dark:border-l-black/70 bg-coolGrey-1 !rounded-md flex !grow"
			>
				{posts.length === 0 ? (
					<NoChapters
						title="User has no posts"
						p1="This user does has not created any posts. If you know them, you can still send them a message"
					/>
				) : (
					<div className="flex gap-2 flex-wrap px-4 w-full py-2 flex-row content-start">
						{posts?.map((post) => (
							<PostCard
								post={post}
								openPost={() => navigate(`/posts/${post.uid}`)}
								width="w-[23.0rem]"
							/>
						))}
					</div>
				)}
			</Tabs.Panel>
		</Tabs>
	);
};
