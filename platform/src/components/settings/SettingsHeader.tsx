import { Divider } from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { IconSettings } from "@tabler/icons-react";
import { FC } from "react";

export const SettingsHeader: FC<{ tab: string | undefined }> = ({ tab }) => {
	const breadcrumbs = [
		{ label: tab, path: "/settings", icon: <IconSettings size={18} /> },
	];

	return (
		<div className="rounded-lg text-coolGrey-7 dark:text-coolGrey-4">
			<div className="relative flex w-full items-center">
				<Breadcrumbs items={breadcrumbs} />
				<div className=" ml-auto flex cursor-pointer"></div>
			</div>
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
		</div>
	);
};
