import { RichTextEditor } from "@mantine/tiptap";
import { FC } from "react";
import { Button, Text, TextInput } from "@mantine/core";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons";
import { BubbleMenu } from "@tiptap/react";
import { inputStyles } from "../../styles/inputStyles";
export const BaseEditor: FC<{
	editor: any;
	height: string;
	saveContent?: () => void;
	minWidth?: string;
	chapterTitle?: string;
	setTitle?: React.Dispatch<React.SetStateAction<string>>;
	isTitle?: boolean;
}> = ({
	editor,
	height,
	saveContent,
	minWidth,
	chapterTitle,
	setTitle,
	isTitle,
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
					margin: "0",
					padding: "0.5rem",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					borderColor: "#e9ecef",
					gap: "0.3rem",
				}}
			>
				{editor && (
					<BubbleMenu editor={editor} className="border-2 ">
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
						</RichTextEditor.ControlsGroup>
					</BubbleMenu>
				)}
				<RichTextEditor.ControlsGroup className="border border-lightBorder  rounded p-[0.3rem] cursor-pointer  hover:bg-lightBorder hover:bg-opacity-40 ">
					<Text color="dimmed" className=" text-xs font-medium">
						{editor.storage.characterCount.words()} words
					</Text>
				</RichTextEditor.ControlsGroup>
				<RichTextEditor.ControlsGroup>
					<button
						onClick={() => editor?.chain().focus().undo().run()}
						disabled={!editor?.can().undo()}
						className="border border-lightBorder  rounded p-[0.3rem] border-r-0 cursor-pointer rounded-r-none hover:bg-lightBorder hover:bg-opacity-40 "
					>
						<IconArrowBackUp size={14} />
					</button>
					<button
						className="border border-lightBorder  rounded p-[0.3rem] rounded-l-none cursor-pointer hover:bg-lightBorder hover:bg-opacity-40 "
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
					{/* <RichTextEditor.Subscript /> */}
					<RichTextEditor.Superscript />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					{/* <RichTextEditor.Link />
					<RichTextEditor.Unlink /> */}
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
			{isTitle && (
				<TextInput
					placeholder="Title"
					defaultValue={chapterTitle}
					onChange={(e) => (setTitle ? setTitle(e.target.value) : null)}
					styles={{
						...inputStyles,
						input: {
							...inputStyles.input,
							fontSize: "2rem !important",
							fontWeight: 400,
							padding: "0.5rem 0.5rem",
							border: "none",
							backgroundColor: "transparent",
							color: "#25262b",
							textAlign: "center",
							margin: "1rem auto",
							textDecoration: "underline",
							"&:focus": {
								outline: "none",
								border: "none",
							},
						},
					}}
				/>
			)}

			<RichTextEditor.Content
				className="transition-all duration-300 ease-in-out text-blueText text-sm"
				style={{
					overflowY: "auto",
					height,
					border: "none",
					backgroundColor: "white",
					width: minWidth ? minWidth : "400px",
				}}
			>
				{/* <h1>hi</h1>	 */}
			</RichTextEditor.Content>
		</RichTextEditor>
	);
};
