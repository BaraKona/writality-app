import { FC, ReactNode } from "react";
import { CgClose, CgChevronUpR, CgChevronDownR } from "react-icons/cg";
import { VscSourceControl, VscVersions } from "react-icons/vsc";
import { AiFillSave } from "react-icons/ai";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { IconDeviceFloppy, IconGitBranch, IconVersions } from "@tabler/icons";
import { Text } from "@mantine/core";

export const EditorWrapper: FC<{
	children: ReactNode;
	backToProject: () => void;
	content: IChapterVersion;
	save: () => void;
	openBranchModal: () => void;
	createVersion: () => void;
	title: string;
}> = ({
	children,
	backToProject,
	content,
	save,
	openBranchModal,
	createVersion,
	title,
}) => {
	return (
		<div className="w-[calc(100vw-12rem)] flex flex-col bg-white gap-2 ">
			<div className=" flex font-semibold py-2  bg-baseLight border-b ">
				<button
					onClick={backToProject}
					className="p-2 rounded hover:bg-baseLighter ml-2 mr-1"
				>
					<CgClose size={20} className="text-blueText hover:text-black" />
				</button>
				<button className="p-2 rounded bg-baseLight hover:bg-baseLighter ml-2 mr-1">
					<CgChevronUpR size={20} className="text-blueText hover:text-black" />
				</button>
				<button className="p-2 rounded bg-baseLight hover:bg-baseLighter ">
					<CgChevronDownR
						size={20}
						className="text-blueText hover:text-black"
					/>
				</button>
				<p className="align-middle mx-2 my-auto">
					<abbr
						className="text-blue-300"
						title={`You are on ${
							content?.type ? content?.type.toUpperCase() : ""
						}`}
					>
						[
						{content?.type
							? content.type.charAt(0).toUpperCase() + content.type.slice(1)
							: ""}
						{content?.name ? ` - ${content.name}` : ""}]
					</abbr>{" "}
					{title}
				</p>
				<Text
					className="text-center my-auto font-medium text-sm  ml-auto  "
					color="dimmed"
				>
					{content?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(content.dateUpdated.date + "")
						: "No updates yet"}
				</Text>
				<button
					className="p-2 ml-2 hover:bg-baseLighter rounded-sm"
					onClick={openBranchModal}
				>
					<abbr title="Create Branch">
						<IconGitBranch
							size={20}
							className="text-blueText hover:text-black"
						/>
					</abbr>
				</button>
				<button
					className="p-2 hover:bg-baseLighter rounded-sm"
					onClick={createVersion}
				>
					<abbr title="Create Version">
						<IconVersions
							size={20}
							className="text-blueText hover:text-black"
						/>
					</abbr>
				</button>
				<button
					onClick={save}
					className=" p-2 mr-2 hover:bg-baseLighter rounded-sm"
				>
					<IconDeviceFloppy
						size={20}
						className="text-blueText hover:text-black"
					/>
				</button>
			</div>
			<div className="py-3 px-5 overflow-y-hidden">
				<div className="text-editor flex w-full justify-between align-middle">
					{children}
				</div>
			</div>
		</div>
	);
};
