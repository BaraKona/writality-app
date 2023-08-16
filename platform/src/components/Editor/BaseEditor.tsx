import { RichTextEditor } from "@mantine/tiptap";
import { FC, useEffect } from "react";
import { Button, ScrollArea, Text, TextInput } from "@mantine/core";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react";
import { BubbleMenu } from "@tiptap/react";
import { inputStyles } from "../../styles/inputStyles";
export const BaseEditor: FC<{
	editor: any;
	height?: string;
	chapterTitle?: string;
	setTitle?: React.Dispatch<React.SetStateAction<string>>;
	isTitle?: boolean;
	content: string;
	noCounter?: boolean;
	noBack?: boolean;
	noBar2?: boolean;
}> = ({
	editor,
	height,
	chapterTitle,
	setTitle,
	isTitle,
	content,
	noCounter,
	noBack,
	noBar2,
}) => {
	useEffect(() => {
		editor.commands.setContent(content);
	}, [content]);

	return (
		<RichTextEditor
			editor={editor}
			style={{
				margin: "0 auto",
				border: "1px solid #ebebeb",
				// maxWidth: "850px",
				minWidth: "400px",
				height: "100%",
				width: "100%",
				backgroundColor: "#fff",
			}}
			styles={{
				toolbar: {
					top: 0,
				},
				content: {
					maxWidth: "850px",
					minWidth: "400px",
					padding: "0 1rem",
					margin: "0 auto",
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
				{!noCounter && (
					<RichTextEditor.ControlsGroup className="border border-border  rounded p-[0.3rem] cursor-pointer  hover:bg-primary hover:bg-opacity-40 ">
						<Text color="dimmed" size="xs" weight={500}>
							{editor.storage.characterCount.words()} words
						</Text>
					</RichTextEditor.ControlsGroup>
				)}
				{!noBack && (
					<RichTextEditor.ControlsGroup>
						<button
							onClick={() => editor?.chain().focus().undo().run()}
							disabled={!editor?.can().undo()}
							className="border border-border  rounded p-[0.3rem] border-r-0 cursor-pointer rounded-r-none hover:bg-primary hover:bg-opacity-40 "
						>
							<IconArrowBackUp size={14} />
						</button>
						<button
							className="border border-border  rounded p-[0.3rem] rounded-l-none cursor-pointer hover:bg-primary hover:bg-opacity-40 "
							onClick={() => editor?.chain().focus().redo().run()}
							disabled={!editor?.can().redo()}
						>
							<IconArrowForwardUp size={14} />
						</button>
					</RichTextEditor.ControlsGroup>
				)}

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
				{!noBar2 && (
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.Hr />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						{/* <RichTextEditor.Subscript /> */}
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>
				)}
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
			<ScrollArea type="hover" h={height}>
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
								height: "auto",
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
					className="transition-all duration-300 ease-in-out text-coolGrey-7 "
					style={{
						border: "none",
						backgroundColor: "white",
						fontSize: "0.85rem",
					}}
				/>
			</ScrollArea>
		</RichTextEditor>
	);
};
