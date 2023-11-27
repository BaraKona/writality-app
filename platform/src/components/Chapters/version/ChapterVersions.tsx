import { FC } from "react";
import { useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { Skeleton, Text } from "@mantine/core";
import { IconFilePencil, IconVersions } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import useChapterVersions from "../../../hooks/chapter/useChapterVersions";

export const ChapterVersions: FC<{
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setVersion: React.Dispatch<React.SetStateAction<any>>;
}> = ({ setOpen, setVersion }) => {
	const { chapter } = useParams();

	const { data: versions, isLoading } = useChapterVersions(chapter as string);

	return (
		<>
			{isLoading && (
				<div className="flex items-center flex-col gap-1 h-[calc(100dvh-10rem)] p-1">
					<Skeleton height={25} width="100%" />
					<Skeleton height={25} width="100%" />
					<Skeleton height={25} width="100%" />
				</div>
			)}
			{versions?.length > 0 ? (
				<div className="p-1">
					<div className="h-[calc(100dvh-10rem)] overflow-y-auto flex gap-1 flex-col">
						{versions?.map((version: IChapterVersion, index: number) => (
							<button
								onClick={() => {
									setOpen(true), setVersion(version);
								}}
								key={index}
								className="px-2 py-1 flex justify-between gap-2 items-center dark:hover:bg-hoverDark hover:bg-coolGrey-1 p-2 rounded-md group"
							>
								<div className="flex gap-1 transition-all ease-in-out duration-200 items-center text-xs  text-coolGrey-6 dark:text-coolGrey-5">
									<div className="p-0.5 text-teal-800/70 dark:text-teal-500 rounded-md text-coolGrey-1">
										<IconFilePencil size={18} />
									</div>

									<p className="font-medium">
										{version.name ? version.name : "Version"}:
									</p>
								</div>
								<Text color="dimmed" size="xs">
									{useTimeFromNow(version.dateCreated?.date)}
								</Text>
							</button>
						))}
					</div>
				</div>
			) : (
				<div className="flex gap-2 items-center text-xs p-2">
					<div className="text-coolGrey-7">
						<IconVersions size={18} />
					</div>
					You do not have any versions saved for this chapter
				</div>
			)}
		</>
	);
};
