import { FC, ReactNode } from "react";
import { CgClose, CgChevronUpR, CgChevronDownR } from "react-icons/cg";
import { VscSourceControl, VscVersions } from "react-icons/vsc";
import { AiFillSave } from "react-icons/ai";
import { IChapterVersion } from "../../interfaces/IChapterVersion";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";

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
		<div className="w-full flex flex-col bg-baseMid  gap-2 m-3 mx-3 shadow-lg border border-baseBorder rounded-md ">
			<div className=" flex font-semibold py-2  bg-baseLight border-b border-baseBorder">
				<button
					onClick={backToProject}
					className="p-2 rounded hover:bg-baseLighter ml-2 mr-1"
				>
					<CgClose size={18} color={"#d8b4fe"} />
				</button>
				<button className="p-2 rounded bg-baseLight hover:bg-baseLighter ml-2 mr-1">
					<CgChevronUpR size={18} color={"#d8b4fe"} />
				</button>
				<button className="p-2 rounded bg-baseLight hover:bg-baseLighter ">
					<CgChevronDownR size={18} color={"#d8b4fe"} />
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
				<p className="text-center my-auto font-medium text-md ml-auto ">
					{content?.dateUpdated?.date
						? "Last updated: " + useTimeFromNow(content.dateUpdated.date)
						: "No updates yet"}
				</p>
				<button
					className="p-2 ml-2 hover:bg-baseLighter rounded-sm"
					onClick={openBranchModal}
				>
					<abbr title="Create Branch">
						<VscSourceControl size={18} color={"#d8b4fe"} />
					</abbr>
				</button>
				<button
					className="p-2 hover:bg-baseLighter rounded-sm"
					onClick={createVersion}
				>
					<abbr title="Create Version">
						<VscVersions size={18} color={"#d8b4fe"} />
					</abbr>
				</button>
				<button
					onClick={save}
					className=" p-2 mr-2 hover:bg-baseLighter rounded-sm"
				>
					<AiFillSave size={18} color={"#d8b4fe"} />
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
