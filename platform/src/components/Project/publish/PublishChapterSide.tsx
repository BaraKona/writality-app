import { FC } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { Textarea } from "@mantine/core";
import { inputStyles } from "../../../styles/inputStyles";
import { IChapterVersion } from "../../../interfaces/IChapterVersion";
import { IChapterContent } from "../../../interfaces/IChapterContent";
import { IChapter } from "../../../interfaces/IChapter";
import { circle1 } from "../../../assets/icons";

export const PublishChapterSide: FC<{
	chapter: IChapter;
	editor: BlockNoteEditor | null;
}> = ({ chapter, editor }) => {
	if (!chapter || !editor)
		return (
			<div className="flex flex-col flex-grow px-3 mx-auto w-80 bg-base border border-border dark:border-borderDark rounded-normal">
				<div className="flex items-center h-[calc(100vh-13rem)]">
					<div className=" flex items-center flex-col gap-5 m-auto flex-wrap">
						<div className="my-auto">
							<img src={circle1} alt="circle1" width={200} height={200} />
						</div>
						<div>
							<h3 className="text-md font-semibold mb-2 ">
								{" "}
								Publish chapters{" "}
							</h3>
							<p className="w-72 text-gray-400 text-sm mb-3">
								Select a chapter to publish to review and publish it. Published
								chapters will be available to read by the public.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	editor.isEditable = false;
	return (
		<div className="flex flex-col flex-grow  mx-auto w-80 bg-base border border-border dark:border-borderDark rounded-normal">
			<div className="max-w-4xl mx-auto py-10 h-[calc(100vh-7.5rem)] overflow-y-auto">
				<Textarea
					placeholder="Title"
					defaultValue={chapter.content.title}
					readOnly={true}
					minRows={1}
					maxRows={4}
					styles={{
						...inputStyles,
						input: {
							...inputStyles.input,
							fontSize: "3rem !important",
							fontWeight: 800,
							padding: "0 3rem",
							height: "auto",
							border: "none",
							backgroundColor: "transparent",
							color: "#25262b",
							margin: "1rem auto",
						},
					}}
				/>
				<BlockNoteView editor={editor} />
			</div>
		</div>
	);
};
