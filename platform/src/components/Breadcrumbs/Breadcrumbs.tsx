import { Breadcrumbs as MantineBreadcrumbs } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { BreadcrumbItem } from "./BreadcrumbItem";

export type BreadcrumbItemProp = {
	path: string;
	label?: string;
	isLoading?: boolean;
	icon?: React.ReactNode;
};

export const Breadcrumbs: React.FC<{
	items: BreadcrumbItemProp[];
}> = ({ items }) => {
	return (
		<MantineBreadcrumbs separator={<IconChevronRight size={14} />}>
			{items.map((item, index) => (
				<BreadcrumbItem
					isLast={index === items.length - 1}
					key={item.path}
					item={item}
				/>
			))}
		</MantineBreadcrumbs>
	);
};
