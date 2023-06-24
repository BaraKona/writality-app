import { useNavigate, useParams } from "react-router-dom";
import { deleteSingleProject } from "../../api/project/projects";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { DeleteModal } from "../Modals";

export const ProjectSettings = () => {
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
				navigate("/dashboard");
			},
		}
	);

	return (
		<DeleteModal
			opened={openDeleteProject}
			setOpened={setOpenDeleteProject}
			deleteBranch={deleteProject.mutate}
			type="project"
		/>
	);
};
