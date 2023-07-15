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
}> = ({ history, close }) => {
	const [searchParams] = useSearchParams();
	const active = searchParams.get("sidebar") === "history";
	return (
		<div className={`${active ? "" : "hidden"}`}>
			<ChapterHistory history={history} close={close} />
		</div>
	);
};
