import { FC, ReactNode } from "react";
import { IProject } from "../../interfaces/IProject";
import { AiFillSetting } from "react-icons/ai";
import {
	IconCards,
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
		<div className=" w-full overflow-y-auto bg-white rounded-t-md text-blueText ">
			<div className="px-7  pt-6">
				<div className="relative flex w-full items-center">
					<h2 className="mr-auto text-sm font-medium flex gap-2 pb-3">
						<IconCards size={20} /> Browse posts
					</h2>
					<div className=" ml-auto flex cursor-pointer">
						<CreateButton
							createNewChapter={openModal}
							text="New Post"
							icon={<IconNote size={20} />}
						/>
					</div>
				</div>
				<Divider className="mt-2 border-gray-200" />
			</div>
		</div>
	);
};
