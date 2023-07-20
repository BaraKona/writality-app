import React, { FC } from "react";
import { ChapterHistory } from "./ChapterHistory";
import { Tooltip, Menu } from "@mantine/core";
import { IconFileTime } from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { useSearchParams } from "react-router-dom";
export const ChapterHistoryMenu: FC<{
	history: IChapter["history"];
	close: () => void;
	active: boolean;
}> = ({ history, close, active }) => {
	return (
		<div className={`${active ? "" : "hidden"}`}>
			<ChapterHistory history={history} close={close} />
		</div>
	);
};
