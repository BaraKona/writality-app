import { Divider } from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { IconSettings } from "@tabler/icons-react";

export const SettingsHeader = () => {
	const breadcrumbs = [
		{ label: "Settings", path: "/settings", icon: <IconSettings size={18} /> },
	];

	return (
		<div className="bg-base rounded-normal text-coolGrey-7">
			<div className="relative flex w-full items-center">
				<Breadcrumbs items={breadcrumbs} />
				<div className=" ml-auto flex cursor-pointer"></div>
			</div>
			<Divider my="xs" color="grey.0" />
		</div>
	);
};
