import { FC, ReactNode } from "react";
import { IconCards, IconEdit, IconTemplate } from "@tabler/icons-react";
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
		<div className="bg-base rounded-normal text-coolGrey-7">
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
			<Divider className="mt-2 border-border" />
		</div>
	);
};
