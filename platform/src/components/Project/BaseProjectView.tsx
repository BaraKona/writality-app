import { FC, ReactNode } from "react";
import { IProject } from "../../interfaces/IProject";
import { AiFillSetting } from "react-icons/ai";
import { IconPoint, IconX } from "@tabler/icons";
import { useTabContext } from "../../contexts/TabContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
export const BaseProjectView: FC<{
	children: ReactNode;
	project: IProject;
	openModal: () => void;
}> = ({ children, project, openModal }) => {
	const { setTabs: setTab, tabs } = useTabContext();
	const navigate = useNavigate();

	if (!project) return <Loading isLoading={true} />;

	const closeTab = (
		e: React.MouseEvent<SVGElement>,
		tab: { path: string; title: string; id: string }
	) => {
		e.stopPropagation();
		if (tabs.length === 1) return;
		setTab(tabs.filter((t) => t.id !== tab.id));
		if (tab.id === project.uid) {
			const index = tabs.findIndex((t) => t.id === tab.id);

			const prevTab = tabs[index - 1];
			const nextTab = tabs[index + 1];
			if (prevTab) {
				navigate(prevTab.path);
			} else {
				navigate(nextTab.path);
			}
		}
	};

	return (
		<div className="w-full drop-shadow h-full">
			<div className="mt-3 flex ">
				{tabs.map((tab, index) => (
					<div
						className={`${
							tab.id === project.uid ? "bg-white" : "hover:bg-opacity-80"
						}  px-4 py-2 rounded-t-2xl w-44 hover:bg-white cursor-default`}
						key={index}
						onClick={() => navigate(tab.path)}
					>
						<h2 className="text-sm font-medium text-blueText flex gap-1 items-center">
							<IconPoint size={20} onClick={(e) => navigate(tab.path)} />
							<span className="whitespace-nowrap w-28 text-ellipsis overflow-hidden">
								{tab.title}
							</span>
							<IconX
								className="ml-auto hover:bg-gray-100 rounded-sm"
								size={13}
								onClick={(e) => closeTab(e, tab)}
							/>
						</h2>
					</div>
				))}
			</div>
			{children}
		</div>
	);
};
