import { IconTrash } from "@tabler/icons-react";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { inputStyles } from "../../../styles/inputStyles";
import { Select, Text } from "@mantine/core";
import { IProject } from "../../../interfaces/IProject";
import { FC } from "react";
import { useDefaultDate, useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { circle4 } from "../../../assets/icons";

export const ProjectCollaboratorTable: FC<{
	collaborators: IProject["collaborators"];
	emptyText: string;
}> = ({ collaborators, emptyText }) => {
	if (!collaborators || collaborators?.length === 0) {
		return (
			<div className="dark:bg-hoverDark/30 border dark:border-none max-w-4xl flex-grow rounded-lg h-64 p-4 px-6 items-center justify-center flex flex-col gap-4">
				<img src={circle4} alt="circle4" width={100} height={100} />
				<p className="text-sm max-w-md text-center mx-auto dark:text-coolGrey-6 text-coolGrey-5">
					{emptyText}
				</p>
			</div>
		);
	}

	return (
		<div className="dark:bg-hoverDark/30 border dark:border-none max-w-4xl flex-grow rounded-lg h-64 p-6">
			<div className="w-full flex gap-3 text-coolGrey-4 dark:text-coolGrey-4 text-xs uppercase font-bold">
				<div className="w-3/12">
					<Text className="">Name</Text>
				</div>
				<div className="w-2/12">
					<Text className="">Date Added</Text>
				</div>
				<div className="w-2/12">
					<Text className="">Last Contribution</Text>
				</div>
				<div className="w-5/12" />
			</div>
			{collaborators.length > 0 ? (
				<div>
					{collaborators.map((collaborator, index) => {
						return (
							<div
								className="w-full flex gap-3 text-coolGrey-12 dark:text-coolGrey-4 text-sm items-center py-2 border-b border-border dark:border-borderDark"
								key={index}
							>
								<div className="w-3/12 flex flex-col">
									<Text className="!text-[1.1rem] font-semibold">
										{collaborator.user.name}
									</Text>
									<p className="text-coolGrey-5 -mt-1">
										{collaborator.user.email}
									</p>
								</div>
								<div className="w-2/12">
									<p className="text-coolGrey-5">
										{useDefaultDate(collaborator.dateAdded)}
									</p>
								</div>
								<div className="w-2/12">
									<p className="text-coolGrey-5">
										{collaborator?.lastContribution
											? useTimeFromNow(collaborator?.lastContribution)
											: "Never"}
									</p>
								</div>
								<div className="w-5/12 flex items-center">
									<Select
										data={[
											{
												label: "Admin",
												value: "admin",
											},
											{
												label: "Editor",
												value: "editor",
											},
											{
												label: "Owner",
												value: "owner",
											},
											{
												label: "Guest",
												value: "guest",
											},
										]}
										defaultValue={collaborator.role}
										onChange={(value) => {
											console.log(value);
										}}
										styles={inputStyles}
										className="ml-auto pt-2"
									/>
									<ButtonWrapper
										className="ml-2 p-2"
										onClick={() => {
											console.log("remove collaborator");
										}}
									>
										<IconTrash size={20} />
									</ButtonWrapper>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
};
