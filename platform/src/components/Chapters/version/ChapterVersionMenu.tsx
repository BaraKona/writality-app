import React, { FC, SetStateAction } from "react";
import { ChapterVersions } from "./ChapterVersions";
import { Button, Menu, Tooltip } from "@mantine/core";
import { IconVersions } from "@tabler/icons";
import { IChapter } from "../../../interfaces/IChapter";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { tooltipStyles } from "../../../styles/tooltipStyles";
import { useSearchParams } from "react-router-dom";

export const ChapterVersionMenu: FC<{
	chapterVersions: IChapterVersion[];
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	setVersion: (version: IChapterVersion) => void;
	text: string;
	close: () => void;
}> = ({ chapterVersions, setOpen, setVersion, text, close }) => {
	const [searchParams] = useSearchParams();
	const active = searchParams.get("sidebar") === "versions";
	return (
		<div
			className={`${
				active ? "" : "hidden"
			} transition-all ease-in-out duration-500`}
		>
			<ChapterVersions
				chapterVersions={chapterVersions}
				setOpen={setOpen}
				setVersion={setVersion}
				text={text}
				close={close}
			/>
		</div>
	);
};
