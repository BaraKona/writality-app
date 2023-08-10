import { getUserFavourites } from "../../api/project/projects";
import { useQuery } from "react-query";

export const useFavouriteProjects = () => {
	return useQuery("favourites", () => {
		return getUserFavourites();
	});
};
