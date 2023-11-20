import { useMutation } from "react-query";
import { useToast } from "../useToast";
import { sendVerificationEmail } from "../../api/user";

export const useSendVerificationEmail = () => {
	return useMutation(sendVerificationEmail, {
		onSuccess: () => {
			useToast("success", "Verification email sent successfully.");
		},
		onError: () => {
			useToast("error", "Verification email failed to send.");
		},
	});
};
