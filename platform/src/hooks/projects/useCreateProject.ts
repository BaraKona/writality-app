import { useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const createProject = (project: any) => {
	const createProject = () => {
		const docId = uuidv4();
		const data = {
			uid: docId,
			owner: project.owner,
			title: "No",
			dateCreated: {
				user: project.owner,
				date: new Date().toLocaleString("en-GB"),
			},
			type: "solitary",
		};
		console.log(data);
		axios.post(import.meta.env.VITE_API_URL + "/projects", data);
	};
	return createProject();
};
export const useCreateProject = () => {
	return useQuery("projects", () => {
		return createProject;
	});
};
