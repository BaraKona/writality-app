import { FC, ReactNode } from "react";
import { IProject } from "../../interfaces/IProject";
import { AiFillSetting } from "react-icons/ai";
import {
	IconCards,
	IconEdit,
	IconNote,
	IconPencilPlus,
	IconTrash,
	IconWriting,
} from "@tabler/icons";
import { Affix, Button, Divider } from "@mantine/core";
import { CreateButton } from "../buttons/CreateChapterButton";

export const PostHeader: FC<{
	children?: ReactNode;
	title?: string;
	openModal: () => void;
}> = ({ children, title, openModal }) => {
	return (
		<div className=" overflow-y-auto bg-white rounded-t-md text-blueText ">
			<div className="px-7 pb-3 pt-6">
				<div className="relative flex w-full items-center">
					<h2 className="mr-auto text-xs font-medium flex gap-2 ">
						<IconCards size={20} /> Browse posts
					</h2>
					<div className=" ml-auto flex cursor-pointer">
						<CreateButton
							createNewChapter={openModal}
							text="New Post"
							icon={<IconEdit size={20} />}
						/>
					</div>
				</div>
				<Divider className="mt-2 border-gray-200" />
			</div>
		</div>
	);
};
