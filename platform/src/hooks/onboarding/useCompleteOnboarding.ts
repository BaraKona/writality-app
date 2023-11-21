import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../useToast";
import { completeOnboarding } from "../../api/user";

export const useCompleteOnboarding = () => {
	const queryClient = useQueryClient();
	return useMutation(completeOnboarding, {
		onSuccess: () => {
			useToast("success", "Onboarding completed successfully.");
			queryClient.invalidateQueries("user");
		},
		onError: (err: any) => {
			useToast("error", err.message);
		},
	});
};
