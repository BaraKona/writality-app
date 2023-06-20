import React, { FC } from "react";
import { Tooltip, Menu } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
import { ChapterSettings } from "./ChapterSettings";
export const ChapterSettingsMenu: FC<{}> = () => {
	return (
		<Menu position="left-start" offset={5}>
			<Menu.Target>
				<Tooltip label="Settings" position="left" withArrow>
					<div className="border border-gray-200 p-2 rounded-md group">
						<IconSettings
							size={20}
							className="text-blueText group-hover:text-black "
						/>
					</div>
				</Tooltip>
			</Menu.Target>
			<Menu.Dropdown className="bg-white border-none shadow-md">
				<ChapterSettings />
			</Menu.Dropdown>
		</Menu>
	);
};
