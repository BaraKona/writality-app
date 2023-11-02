import { getSingleUser } from "../../api/user";
import { useQuery } from "react-query";
import { useToast } from "../useToast";

export const useSingleUser = (userId: string) => {
	const { data, isLoading, error } = useQuery(
		["profile", userId],
		() => getSingleUser(userId),
		{
			onError: (err: any) => {
				useToast("error", err.message);
			},
		}
	);
	return { data, isLoading, error };
};
