import { IconTrash } from "@tabler/icons-react";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { inputStyles } from "../../../styles/inputStyles";
import { Select, Text } from "@mantine/core";
import { IProject } from "../../../interfaces/IProject";
import { FC } from "react";
import { useDefaultDate, useTimeFromNow } from "../../../hooks/useTimeFromNow";
import { circle4 } from "../../../assets/icons";

export const ProjectInviteTable: FC<{
	collaborators: IProject["pendingInvite"];
	projectId: string;
	emptyText: string;
	revokeInvite: ({
		projectId,
		userId,
	}: {
		projectId: string;
		userId: string;
	}) => void;
}> = ({ collaborators, emptyText, revokeInvite, projectId }) => {
	if (!collaborators || collaborators?.length === 0) {
		return (
			<div className="dark:bg-hoverDark/30 border dark:border-none max-w-4xl flex-grow rounded-md h-64 p-4 px-6 items-center justify-center flex flex-col gap-4">
				<img src={circle4} alt="circle4" width={100} height={100} />
				<p className="text-sm max-w-md text-center mx-auto dark:text-coolGrey-6 text-coolGrey-5">
					{emptyText}
				</p>
			</div>
		);
	}

	return (
		<div className="dark:bg-hoverDark/30 border dark:border-none max-w-4xl flex-grow rounded-md h-64 p-6">
			<div className="w-full flex gap-3 text-coolGrey-4 dark:text-coolGrey-4 text-xs uppercase font-bold">
				<div className="w-2/5">
					<Text className="">Name</Text>
				</div>
				<div className="w-1/5">
					<Text className="">Date sent</Text>
				</div>
				<div className="w-2/5" />
			</div>
			{collaborators.length > 0 ? (
				<div>
					{collaborators.map((collaborator, index) => {
						return (
							<div
								className="dark:border-borderDark border-b border-border w-full flex gap-3 text-coolGrey-12 dark:text-coolGrey-4 text-sm items-center py-2"
								key={index}
							>
								<div className="w-2/5 flex flex-col">
									<Text className="!text-[1.1rem] font-semibold">
										{collaborator.user.name}
									</Text>
									<p className="text-coolGrey-5 -mt-1">
										{collaborator.user.email}
									</p>
								</div>
								<div className="w-1/5">
									<p className="text-coolGrey-5 -mt-1">
										{useDefaultDate(collaborator.dateAdded)}
									</p>
								</div>
								<div className="w-2/5 flex gap-2">
									<button
										className="ml-auto flex items-center gap-2 text-coolGrey-4 dark:text-coolGrey-4 text-sm rounded-md border border-border dark:border-borderDark p-1 px-4 hover:bg-coolGrey-2/40 dark:hover:bg-hoverDark transition-colors ease-in-out duration-300"
										onClick={() => console.log("delete")}
									>
										<Text>Resend</Text>
									</button>
									<button
										className="flex items-center gap-2 text-coolGrey-4 dark:text-coolGrey-4 text-sm rounded-md border border-border dark:border-borderDark p-1 px-4 dark:hover:bg-rose-700/50 dark:hover:border-rose-700 hover:bg-rose-400 hover:text-coolGrey-0 hover:border-rose-400  transition-colors ease-in-out duration-300"
										onClick={() =>
											revokeInvite({
												projectId,
												userId: collaborator.user.uid,
											})
										}
									>
										<Text>Revoke</Text>
									</button>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
};
