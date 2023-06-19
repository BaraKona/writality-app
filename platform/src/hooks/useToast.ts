import toast from "react-hot-toast";

export const useToast = (type: string, message: string) => {
	const style = {
		borderRadius: "10px",
		background: "#fff",
		color: "#394251",
	};
	switch (type) {
		case "error":
			toast.error(message, { style });
			break;
		case "success":
			toast.success(message, { style });
			break;
		case "loading":
			toast.loading(message, { style });
			break;
		default:
			toast(message, { style });
			break;
	}
};
