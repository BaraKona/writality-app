import { RichTextEditor } from "@mantine/tiptap";
import { FC } from "react";
import { Button } from "@mantine/core";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons";
import { BubbleMenu } from "@tiptap/react";
export const BaseEditor: FC<{ editor: any; height: string }> = ({
	editor,
	height,
}) => {
	return (
		<RichTextEditor
			editor={editor}
			style={{
				margin: "0 auto",
				border: "none",
				maxWidth: "850px",
				minWidth: "400px",
				paddingRight: "20px",
			}}
			styles={{
				toolbar: {
					top: 0,
					backgroundColor: "transparent",
				},
			}}
		>
			<RichTextEditor.Toolbar
				sticky
				stickyOffset={10}
				style={{
					margin: "0 auto",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{editor && (
					<BubbleMenu editor={editor} className="bg-baseLight">
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
						</RichTextEditor.ControlsGroup>
					</BubbleMenu>
				)}
				<RichTextEditor.ControlsGroup>
					<p className="text-zinc-400">
						{editor.storage.characterCount.words()} words{" "}
					</p>
				</RichTextEditor.ControlsGroup>
				<RichTextEditor.ControlsGroup>
					<button
						onClick={() => editor?.chain().focus().undo().run()}
						disabled={!editor?.can().undo()}
						className="border border-zinc-700  rounded p-[0.3rem] border-r-0 cursor-pointer rounded-r-none hover:bg-zinc-700 hover:bg-opacity-40 "
					>
						<IconArrowBackUp size={14} />
					</button>
					<button
						className="border border-zinc-700  rounded p-[0.3rem] rounded-l-none cursor-pointer hover:bg-zinc-700 hover:bg-opacity-40 "
						onClick={() => editor?.chain().focus().redo().run()}
						disabled={!editor?.can().redo()}
					>
						<IconArrowForwardUp size={14} />
					</button>
				</RichTextEditor.ControlsGroup>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					{/* <RichTextEditor.Highlight /> */}
					{/* <RichTextEditor.Code /> */}
				</RichTextEditor.ControlsGroup>

				{/* <RichTextEditor.ControlsGroup>
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
        <RichTextEditor.H3 />
        <RichTextEditor.H4 />
      </RichTextEditor.ControlsGroup> */}

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Blockquote />
					<RichTextEditor.Hr />
					<RichTextEditor.BulletList />
					<RichTextEditor.OrderedList />
					<RichTextEditor.Subscript />
					<RichTextEditor.Superscript />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
					<RichTextEditor.ColorPicker
						colors={[
							"#25262b",
							"#868e96",
							"#fa5252",
							"#e64980",
							"#be4bdb",
							"#7950f2",
							"#4c6ef5",
							"#228be6",
							"#15aabf",
							"#12b886",
							"#40c057",
							"#82c91e",
							"#fab005",
							"#fd7e14",
						]}
					/>
					{/* <RichTextEditor.Color color="#F03E3E" />
					<RichTextEditor.Color color="#7048E8" />
					<RichTextEditor.Color color="#1098AD" />
					<RichTextEditor.Color color="#37B24D" />
					<RichTextEditor.Color color="#F59F00" /> */}
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.AlignLeft />
					<RichTextEditor.AlignCenter />
					<RichTextEditor.AlignJustify />
					<RichTextEditor.AlignRight />
				</RichTextEditor.ControlsGroup>
			</RichTextEditor.Toolbar>

			<RichTextEditor.Content
				className="hover:bg-baseColour bg-transparent transition-all duration-300 ease-in-out"
				style={{
					overflowY: "auto",
					height: height,
					border: "none",
					backgroundColor: "transparent",
					minWidth: "400px",
				}}
			/>
		</RichTextEditor>
	);
};
