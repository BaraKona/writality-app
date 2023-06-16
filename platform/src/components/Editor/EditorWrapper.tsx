import { FC, ReactNode } from "react";
import { CgClose, CgChevronUpR, CgChevronDownR } from "react-icons/cg";
import { VscSourceControl, VscVersions } from "react-icons/vsc";
import { AiFillSave } from "react-icons/ai";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import {
	IconDeviceFloppy,
	IconFileText,
	IconGitBranch,
	IconVersions,
} from "@tabler/icons";
import { Divider, Text } from "@mantine/core";

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
		<div className="w-[calc(100vw-12rem)] flex flex-col bg-white rounded-t-md gap-2 pt-4 px-7 ">
			<div className=" flex   ">
				<button onClick={backToProject}>
					<CgClose size={18} className="text-blueText hover:text-black" />
				</button>
				{/* <button className="p-2 rounded bg-baseLight ml-2 mr-1">
					<CgChevronUpR size={20} className="text-blueText hover:text-black" />
				</button>
				<button className="p-2 rounded bg-baseLight ">
					<CgChevronDownR
						size={20}
						className="text-blueText hover:text-black"
					/>
				</button> */}
				<div className="align-middle mx-2 my-auto text-sm text-blueText flex gap-2">
					<IconFileText size={20} />
					<div>
						<abbr
							className="text-blue-300 mr-1"
							title={`You are on ${
								content?.type ? content?.type.toUpperCase() : ""
							}`}
						>
							[
							{content?.type
								? content.type.charAt(0).toUpperCase() + content.type.slice(1)
								: ""}
							{content?.name ? ` - ${content.name}` : ""}]
						</abbr>
						{title}
					</div>
				</div>
				<Text
					className="text-center my-auto font-medium text-sm  ml-auto  "
					color="dimmed"
				>
					{content?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(content.dateUpdated.date + "")
						: "No updates yet"}
				</Text>
				<button className="p-2 ml-2 rounded-sm" onClick={openBranchModal}>
					<abbr title="Create Branch">
						<IconGitBranch
							size={20}
							className="text-blueText hover:text-black"
						/>
					</abbr>
				</button>
				<button className="p-2 rounded-sm" onClick={createVersion}>
					<abbr title="Create Version">
						<IconVersions
							size={20}
							className="text-blueText hover:text-black"
						/>
					</abbr>
				</button>
				<button onClick={save} className=" p-2 mr-2 rounded-sm">
					<IconDeviceFloppy
						size={20}
						className="text-blueText hover:text-black"
					/>
				</button>
			</div>
			<Divider className="border-gray-200" />
			<div className="h-[calc(100vh-108px)] overflow-y-hidden bg-white">
				<div className="text-editor flex justify-between align-middle">
					{children}
				</div>
			</div>
		</div>
	);
};
