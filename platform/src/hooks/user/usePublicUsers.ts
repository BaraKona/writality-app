import { getAllUsers } from "../../api/user";
import { useQuery } from "react-query";

export const usePublicUsers = () => {
	return useQuery("users", getAllUsers);
};
