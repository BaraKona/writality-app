import { IconHeartPlus } from "@tabler/icons-react";
import { IProject } from "../../interfaces/IProject";
import { Divider, Skeleton } from "@mantine/core";
import { ProjectListItem } from "./ProjectListItem";
import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TabListItem } from "./TabListItem";
export const FavouriteTabItems: FC<{}> = ({}) => {
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();
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
						<div className="text-blueText text-xs font-normal">
							Favourite Tabs
						</div>
					</div>
					<Divider color="grey.0" my={4} />
					{currentUser?.favouriteTabs?.map((tab, index: number) => {
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
					<Divider color="grey.0" my={4} />
				</>
			)}
			{currentUser && currentUser?.favouriteTabs?.length === 0 && (
				<div className="text-blueText text-center text-xs font-normal">
					You have no favourites. Click on the heart icon to add a favourite.
					<IconHeartPlus size={16} className="mx-auto" />
				</div>
			)}
		</>
	);
};
