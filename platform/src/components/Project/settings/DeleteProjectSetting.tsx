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
		() => deleteSingleProject(currentUser.uid, project as string),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["projects", currentUser.uid]);
				navigate("/");
			},
		}
	);
	return (
		<div className="max-w-md">
			<div className="text-sm font-medium text-blueText">Delete Project</div>
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
			<Divider my="xs" color="grey.0" />
		</div>
	);
};
