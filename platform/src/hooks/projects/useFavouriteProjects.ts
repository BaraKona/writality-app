import { getUserFavourites } from "../../api/project/projects";
import { useQuery } from "react-query";

export const useFavouriteProjects = () => {
	return useQuery("bookmarks", () => {
		return getUserFavourites();
	});
};
