import { BaseProjectView } from "../../components/Project";

export const DashboardPage = () => {
	return (
		<BaseProjectView openModal={() => {}} projectId="dashboard">
			<div className="w-full h-full place-items-center rounded-t-md bg-white px-3 py-2">
				<h1 className="text-lg font-bold">Dashboard</h1>
				<p className="text-md">Welcome to the dashboard!</p>
			</div>
		</BaseProjectView>
	);
};
