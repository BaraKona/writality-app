import React, { FC } from "react";
import { Tooltip, Menu } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { IChapter } from "../../../interfaces/IChapter";
import { ChapterSettings } from "./ChapterSettings";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { useSearchParams } from "react-router-dom";

export const ChapterSettingsMenu: FC<{
	close: () => void;
	active: boolean;
}> = ({ close, active }) => {
	return (
		<div className={`${active ? "" : "hidden"}`}>
			<ChapterSettings close={close} />
		</div>
	);
};
