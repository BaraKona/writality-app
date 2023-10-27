import { IconBookmarkPlus } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Skeleton, Text } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TabListItem } from "./TabListItem";
export const FavouriteTabItems: FC<{}> = ({}) => {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();

	const posts = currentUser?.bookmarks?.filter(
		(tab: any) => tab.tabType === "post"
	);

	const projects = currentUser?.bookmarks?.filter(
		(tab: any) => tab.tabType === "project"
	);

	return (
		<>
			{!currentUser ? (
				<>
					<Skeleton height={27} width={160} radius="md" mb={3} />
					<Skeleton height={27} width={160} radius="md" mb={3} />
					<Skeleton height={27} width={160} radius="md" mb={3} />
				</>
			) : (
				<>
					<div>
						<div className="text-blueTextLight text-center text-xs font-normal">
							Bookmarks
						</div>
						<Divider
							className="!border-coolGrey-1 dark:!border-borderDark"
							my={4}
						/>
					</div>
					{projects?.length > 0 && (
						<Divider
							className="!border-coolGrey-1 dark:!border-borderDark"
							my={4}
							label={<Text className="!text-blueTextLight">Projects</Text>}
							labelPosition="center"
						/>
					)}
					{projects?.map((tab: any, index: number) => {
						return (
							<TabListItem
								key={index}
								type={tab.tabType as any}
								url={tab.url}
								name={tab.name || "Untitled"}
								onClick={() => navigate(tab.url)}
							/>
						);
					})}
					{posts?.length > 0 && (
						<Divider
							className="!border-coolGrey-1 dark:!border-borderDark"
							my={4}
							label={<Text className="!text-blueTextLight">Posts</Text>}
							labelPosition="center"
						/>
					)}
					{posts?.map((tab: any, index: number) => {
						return (
							<TabListItem
								key={index}
								type={tab.tabType as any}
								url={tab.url}
								name={tab.name || "Untitled"}
								onClick={() => navigate(tab.url)}
							/>
						);
					})}
				</>
			)}
			{currentUser && currentUser?.bookmarks?.length === 0 && (
				<div className="text-blueTextLight text-center text-xs font-normal">
					You have no favourites. Click on the heart icon to add a favourite.
					<IconBookmarkPlus size={16} className="mx-auto mt-2" />
				</div>
			)}
		</>
	);
};
