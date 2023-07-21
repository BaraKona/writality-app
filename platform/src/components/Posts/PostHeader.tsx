import { FC, ReactNode } from "react";
import { IconCards, IconEdit, IconTemplate } from "@tabler/icons";
import { Button, Divider } from "@mantine/core";
import { CreateButton } from "../buttons/CreateChapterButton";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

export const PostHeader: FC<{
	children?: ReactNode;
	title?: string;
	openModal: () => void;
}> = ({ children, title, openModal }) => {
	const breadcrumbs = [
		{
			path: "/posts",
			label: "Posts",
			icon: <IconTemplate size={18} />,
		},
	];

	return (
		<div className="bg-white rounded-normal text-blueText">
			<div className="relative flex w-full items-center">
				<Breadcrumbs items={breadcrumbs} />
				<div className=" ml-auto flex cursor-pointer">
					<CreateButton
						createNewChapter={openModal}
						text="New Post"
						icon={<IconEdit size={18} />}
					/>
				</div>
			</div>
			<Divider className="my-2 border-lightBorder" />
		</div>
	);
};
