import { useNavigate, useParams } from "react-router-dom";
import { deleteSingleProject } from "../../../api/project/projects";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useState } from "react";
import { DeleteModal } from "../../Modals";
import { CreateChapterButton } from "../../buttons";
import { IconTrash } from "@tabler/icons-react";
import { Divider } from "@mantine/core";

export const DeleteProjectSetting = () => {
	const [openDeleteProject, setOpenDeleteProject] = useState(false);
	const { currentUser } = useAuthContext();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { project } = useParams();
	const deleteProject = useMutation(
		() => deleteSingleProject(project as string),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["projects", currentUser.uid]);
				queryClient.invalidateQueries(["projects"]);
				navigate("/");
			},
		}
	);
	return (
		<div className="max-w-md">
			<div className="text-sm font-medium text-coolGrey-7">Delete Project</div>
			<DeleteModal
				opened={openDeleteProject}
				setOpened={setOpenDeleteProject}
				deleteBranch={deleteProject.mutate}
				type="project"
			/>
			<div className="flex flex-col">
				<p className="text-xs font-light mb-2">
					Deleting a project will delete all of its chapters and all of the
					content inside of them.{" "}
					<span className="text-blue-900">This action cannot be undone.</span>
				</p>
				<div className="ml-auto">
					<CreateChapterButton
						createNewChapter={() => setOpenDeleteProject(true)}
						text="Delete Project"
						icon={<IconTrash size={20} />}
					/>
				</div>
			</div>
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
		</div>
	);
};
