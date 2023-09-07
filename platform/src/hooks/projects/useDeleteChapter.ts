import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { deleteProjectChapter } from "../../api/project/projects";

export const useDeleteChapter = (
	projectId: string,
	chapterId: string,
	setOpen: () => void
) => {
	const queryClient = useQueryClient();
	return useMutation(() => deleteProjectChapter(projectId, chapterId), {
		onSuccess: () => {
			queryClient.invalidateQueries(["project", projectId]);
			queryClient.invalidateQueries(["chapters", projectId]);
			useToast(
				"success",
				"Chapter deleted successfully along with all its components 😃"
			);
			setOpen();
		},
		onError: () => {
			useToast("error", "something went wrong, chapter not deleted 😖");
		},
	});
};
