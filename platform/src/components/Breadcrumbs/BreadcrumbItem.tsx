import { Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";
import { BreadcrumbItemProp } from "./Breadcrumbs";

export const BreadcrumbItem: React.FC<{
	item: BreadcrumbItemProp;
	isLast: boolean;
}> = ({ item, isLast }) => {
	if (isLast) {
		return (
			<span>
				{item.isLoading ? (
					<Skeleton height={18} width={50} className="my-1 mx-1" />
				) : (
					<span className="text-coolGrey-7 dark:text-coolGrey-4 capitalize gap-2 text-xs font-medium p-2 py-1 cursor-default rounded-normal transition-background duration-100 flex items-center">
						{item.icon}
						{item.label}
					</span>
				)}
			</span>
		);
	}
	return (
		<Link to={item.path}>
			{item.isLoading ? (
				<Skeleton height={18} width={50} className="my-1 mx-1.5" />
			) : (
				<span
					className={
						"text-blueTextLight hover:bg-gray-100 gap-2 capitalize hover:text-coolGrey-7 dark:hover:bg-hoverDark dark:text-coolGrey-4 text-xs flex font-medium p-2 py-1 rounded-normal transition-background duration-100 items-center"
					}
				>
					{item.icon}
					{item.label}
				</span>
			)}
		</Link>
	);
};
