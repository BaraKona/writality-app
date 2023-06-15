import { FC, ReactNode } from "react";
import { IProject } from "../../interfaces/IProject";
import { AiFillSetting } from "react-icons/ai";
import { IconPin, IconPinned, IconPoint, IconX } from "@tabler/icons";
import { useTabContext } from "../../contexts/TabContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { Loading } from "../Loading";
import { Divider, Skeleton } from "@mantine/core";

export const BaseProjectView: FC<{
	children: ReactNode;
	projectId?: string;
	openModal?: () => void;
}> = ({ children, projectId, openModal }) => {
	const { setTabs: setTab, tabs } = useTabContext();
	const navigate = useNavigate();

	const closeTab = (
		e: React.MouseEvent<SVGElement>,
		tab: { path: string; title: string; id: string }
	) => {
		e.stopPropagation();
		if (tabs.length === 1) return;
		setTab(tabs.filter((t) => t.id !== tab.id));
		if (tab.id === projectId) {
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
	// make a skeleton loader for this component that keeps a tab open
	if (!projectId) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Skeleton height={50} width={50} />
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="mt-3 flex overflow-x-auto w-[calc(100vw-200px)]">
				{tabs.map((tab, index) => (
					<div
						key={tab.id}
						className={` ${
							tab.id === projectId && "bg-white rounded-t-2xl"
						}  flex items-center justify-between px-2 py-2 w-44 rounded-t-2xl `}
						onClick={() => navigate(tab.path)}
					>
						<div
							className={`flex w-full items-center flex-row cursor-default ${
								tab.id === projectId ? "text-black" : "text-blueText"
							}`}
						>
							<IconPoint size={16} />
							<span className="ml-1 text-sm font-medium  whitespace-nowrap w-[6.5rem] text-ellipsis overflow-hidden">
								{tab.title}
							</span>
							<div className="flex gap-0.5 ml-auto">
								<IconPin
									className="cursor-pointer hover:text-black"
									size={13}
								/>
								<IconX
									className="cursor-pointer"
									onClick={(e) => closeTab(e, tab)}
									size={13}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			{children}
		</div>
	);
};
/**
 *<div
						className={`${
							tab.id === project.uid ? "bg-white" : "hover:bg-opacity-80 "
						}  px-2 py-2 rounded-t-2xl w-44 hover:bg-white cursor-default group`}
						key={index}
						onClick={() => navigate(tab.path)}
					>
						<h2 className="text-sm font-medium text-blueText flex gap-1 items-center">
							<IconPoint size={20} onClick={(e) => navigate(tab.path)} />
							<span className="whitespace-nowrap w-24 text-ellipsis overflow-hidden">
								{tab.title}
							</span>
							{/* {
								tab.
							<IconPinned
								size={13}
								/>
							}
							<IconPin
								className={`ml-auto hover:bg-gray-100 ${"invisible"} rounded-sm  group-hover:visible`}
								size={13}
							/>
							<IconX
								className="hover:bg-gray-100 rounded-sm"
								size={13}
								onClick={(e) => closeTab(e, tab)}
							/>
						</h2>
					</div>
				))}
			</div>
 */
