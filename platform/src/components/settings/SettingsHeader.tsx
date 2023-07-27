import { Divider } from "@mantine/core";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { IconSettings } from "@tabler/icons";

export const SettingsHeader = () => {
	const breadcrumbs = [
		{ label: "Settings", path: "/settings", icon: <IconSettings size={18} /> },
	];

	return (
		<div className="bg-secondary rounded-normal text-blueText">
			<div className="relative flex w-full items-center">
				<Breadcrumbs items={breadcrumbs} />
				<div className=" ml-auto flex cursor-pointer"></div>
			</div>
			<Divider className="my-2 border-border" />
		</div>
	);
};
