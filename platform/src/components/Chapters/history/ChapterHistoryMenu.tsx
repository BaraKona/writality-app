import React, { FC } from "react";
import { ChapterHistory } from "./ChapterHistory";
import { Tooltip, Menu } from "@mantine/core";
import { IconFileTime } from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
export const ChapterHistoryMenu: FC<{
	history: IChapter["history"];
}> = ({ history }) => {
	return (
		<Menu position="left-start" offset={5}>
			<Menu.Target>
				<Tooltip label="History" position="left" withArrow>
					<div className="border border-lightBorder p-2 rounded-normal group">
						<IconFileTime
							size={18}
							className="text-blueText group-hover:text-black "
						/>
					</div>
				</Tooltip>
			</Menu.Target>
			<Menu.Dropdown className="bg-white border-none shadow-md">
				<ChapterHistory history={history} />
			</Menu.Dropdown>
		</Menu>
	);
};
