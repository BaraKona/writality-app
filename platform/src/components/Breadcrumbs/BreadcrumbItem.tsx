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
					<Skeleton height={18} width={50} className="my-1 mx-1.5" />
				) : (
					<span
						className={`text-blueText gap-2 text-xs font-medium py-1 px-1.5 cursor-default rounded-normal transition-background duration-100 flex items-center`}
					>
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
					className={`text-blueTextLight hover:bg-gray-100 gap-2 hover:text-blueText text-xs flex font-medium py-1 px-1.5 rounded-normal transition-background duration-100 items-center`}
				>
					{item.icon}
					{item.label}
				</span>
			)}
		</Link>
	);
};
