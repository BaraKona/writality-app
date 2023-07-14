import React, { FC } from "react";
import { Tooltip, Menu } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
import { ChapterSettings } from "./ChapterSettings";
import { tooltipStyles } from "../../../styles/tooltipStyles";

export const ChapterSettingsMenu: FC<{}> = () => {
	return (
		<Menu position="left-start" offset={5}>
			<Menu.Target>
				<Tooltip
					label="Settings"
					position="left"
					withArrow
					styles={tooltipStyles}
				>
					<div className="border border-lightBorder p-2 rounded-normal group">
						<IconSettings
							size={18}
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
