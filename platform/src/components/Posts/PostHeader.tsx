import { FC, ReactNode } from "react";
import { IProject } from "../../interfaces/IProject";
import { AiFillSetting } from "react-icons/ai";
import { IconPencilPlus, IconTrash } from "@tabler/icons";
import { Affix, Button } from "@mantine/core";

export const PostHeader: FC<{
	children: ReactNode;
	title: string;
	openModal: () => void;
}> = ({ children, title, openModal }) => {
	return (
		<div className=" w-full h-full drop-shadow overflow-y-auto">
			<div className=" py-4 px-8 border-b border-baseBorder ">
				<div className="relative flex w-full">
					<h2 className="mr-auto"> {title} </h2>
					<div className=" flex cursor-pointer">
						{/* <AiFillSetting size={23} color={"#a8a29e"} /> */}
						<Affix
							position={{ top: 10, right: 20 }}
							className="bg-baseColour rounded-md"
						>
							<Button
								color="grape"
								variant="light"
								leftIcon={<IconPencilPlus />}
								onClick={openModal}
							>
								Create Post
							</Button>
						</Affix>
					</div>
				</div>
			</div>
			<div className="mt-4 px-4">{children}</div>
		</div>
	);
};
