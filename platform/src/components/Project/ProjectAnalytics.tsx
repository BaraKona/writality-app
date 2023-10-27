import { FC, ReactNode, useRef, useState } from "react";
import "chart.js/auto";
import { Button, Divider, Menu, Skeleton } from "@mantine/core";
import { useGetProjectWordCount } from "../../hooks/analytics/useGetProjectWordCount";
import { useParams } from "react-router-dom";

type analyticsType = {
	wordCount: number;
	chapterCount: number;
	branchCount: number;
	versionCount: number;
	userCount: number;
	chapterWithMostWords: string;
};

export const ProjectAnalytics: FC<{}> = ({}) => {
	const { project } = useParams();
	const { data: chapterAnalytics, isLoading } = useGetProjectWordCount(
		project as string
	);

	return (
		<div className="col-span-3 p-2 row-span-2 rounded-normal border border-border dark:border-borderDark flex flex-col items-center max-h-96 overflow-y-hidden">
			<div className="w-full">
				<h2 className="text-2xl font-bold">Analytics</h2>
				<p className="text-sm text-gray-500">Analytics for your project</p>
				<Divider
					mb="md"
					className="!border-coolGrey-1 dark:!border-borderDark"
				/>

				<div>
					{isLoading ? (
						<div className="flex flex-wrap gap-2">
							<Skeleton height={112} width="31.5%" />
							<Skeleton height={112} width="31.5%" />
							<Skeleton height={112} width="31.5%" />
							<Skeleton height={112} width="31.5%" />
							<Skeleton height={112} width="31.5%" />
							<Skeleton height={112} width="31.5%" />
						</div>
					) : (
						<div className="flex gap-2 flex-wrap max-h-[18rem] overflow-y-auto">
							<ListItem title="Words">{chapterAnalytics?.wordCount}</ListItem>
							<ListItem title="Total Chapter Count">
								{chapterAnalytics?.chapterCount}
							</ListItem>
							<ListItem title="Total Branch Count">
								{chapterAnalytics?.branchCount}
							</ListItem>
							<ListItem title="Total Version Count">
								{chapterAnalytics?.versionCount}
							</ListItem>
							<ListItem title="Number of contributors">
								{chapterAnalytics?.userCount}
							</ListItem>
							<ListItem title="Chapter with most words">
								{chapterAnalytics?.chapterWithMostWords || "-"}
							</ListItem>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const ListItem: FC<{ children: ReactNode; title: string }> = ({
	children,
	title,
}) => {
	return (
		<div className="flex basis-24 flex-grow flex-shrink-0 flex-col h-28 border-border dark:border-borderDark border rounded-normal p-1 items-center">
			<p className=" text-gray-500 text-center border-b border-border dark:border-borderDark w-full h-[2.3rem] flex justify-center items-center text-xs">
				{title}
			</p>
			<p className="text-lg font-bold text-center">{children}</p>
		</div>
	);
};
