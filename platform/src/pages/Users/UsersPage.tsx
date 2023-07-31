import { Divider } from "@mantine/core";
import { usePublicUsers } from "../../hooks/user/usePublicUsers";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
const initialContent: string | null = localStorage.getItem("editorContent");

export const UsersPage = () => {
	const { data: users, isLoading } = usePublicUsers();
	const editor: BlockNoteEditor | null = useBlockNote({
		initialContent: initialContent ? JSON.parse(initialContent) : undefined,

		onEditorContentChange: (editor) => {
			localStorage.setItem(
				"editorContent",
				JSON.stringify(editor.topLevelBlocks)
			);
		},
	});

	return (
		<div className="h-[calc(100vh-2.7rem)] place-items-center rounded-normal border border-border bg-secondary px-3 py-2">
			<h1 className="text-md font-bold">Users</h1>
			<p className="text-sm">Welcome to the Users! {users && users.length}</p>
			<Divider my="xs" color="grey.0" />
			<div className="max-w-5xl border border-border rounded-normal mx-auto">
				<BlockNoteView editor={editor} />
			</div>
		</div>
	);
};
