import { FC, ReactNode } from "react";
import {
	IconBook,
	IconBook2,
	IconBooks,
	IconHelp,
	IconHome,
	IconLayoutDashboard,
	IconPin,
	IconSettings,
	IconTemplate,
	IconX,
	IconPlus,
} from "@tabler/icons";
import { useTabContext } from "../../contexts/TabContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const MainFrame: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const { setTabs, tabs } = useTabContext();
	const navigate = useNavigate();
	const location = useLocation();
	const { project, chapter } = useParams();
	const pathname = location.pathname;

	if (pathname.includes("project") && project === undefined) {
		return <div></div>;
	}

	const tab = tabs.find((tab) => tab.active);

	// Add chapter to tab path if chapter exists
	// if (chapter) {
	// 	if (tab) {
	// 		if (!tab.path.includes(chapter)) {
	// 			tab.path = tab.path + "/chapter/" + chapter;
	// 		}
	// 	}
	// }

	// Remove chapter from tab path if chapter does not exist
	// if (!chapter) {
	// 	if (tab) {
	// 		if (tab.path.includes("chapter")) {
	// 			tab.path = tab.path.split("/chapter/")[0];
	// 		}
	// 	}
	// }

	if (!tab) {
		setTabs([
			{
				path: "/library",
				title: "Library",
				id: uuidv4(),
				active: true,
			},
		]);
	} else {
		if (tab.path !== pathname) {
			// find index of tab
			const index = tabs.findIndex((tab) => tab.active);
			// replace the tab with the index with the new path
			tabs[index].path = pathname;
			tabs[index].title =
				pathname.split("/")[1].charAt(0).toUpperCase() +
				pathname.split("/")[1].slice(1);
			tabs[index].active = true;
		}
	}

	const tabIcons = [
		{
			title: "Library",
			icon: <IconHome stroke={2.2} size={18} />,
		},
		{
			title: "Stories",
			icon: <IconBooks size={18} />,
		},
		{
			title: "Posts",
			icon: <IconTemplate size={18} />,
		},
		{
			title: "Settings",
			icon: <IconSettings size={18} />,
		},
		{
			title: "Help",
			icon: <IconHelp size={18} />,
		},
	];

	const closeTab = (
		e: React.MouseEvent<SVGElement>,
		tab: { path: string; title: string; id: string; active: boolean }
	) => {
		e.stopPropagation();
		const index = tabs.findIndex((t) => t.active);
		const prevTab = tabs[index - 1];
		const nextTab = tabs[index + 1];

		const filteredTabs = tabs.filter((t) => t.active === false);
		if (tabs.length === 0) navigate("/library");
		if (prevTab) {
			prevTab.active = true;
			navigate(prevTab.path);
		}
		if (nextTab) {
			nextTab.active = true;
			navigate(nextTab.path);
		}

		if (!prevTab && !nextTab) {
			navigate("/library");
		}
		setTabs(filteredTabs);
	};

	const addTab = () => {
		const index = tabs.findIndex((tab) => tab.active === true);

		if (index !== -1) {
			tabs[index].active = false;
			setTabs([
				...tabs,
				{
					path: "/library",
					title: "Library",
					id: uuidv4(),
					active: true,
				},
			]);
		}
	};

	const changeTab = (tab: {
		path: string;
		title: string;
		id: string;
		active: boolean;
	}) => {
		const activeTab = tabs.find((t) => t.active);
		if (activeTab?.id === tab.id) return;
		const index = tabs.findIndex((t) => t.id === tab.id);
		tabs.forEach((t) => (t.active = false));
		tabs[index].active = true;
		setTabs(tabs);
		console.log(tab.path);
		navigate(tab.path);
	};

	return (
		<div>
			<div className="mt-1.5 pb-1 flex gap-1 w-[calc(100vw-14rem)] content-start">
				{tabs.map((tab) => (
					<div
						key={tab.id}
						className={` ${
							tab.active
								? "bg-white border-none hover:bg-white"
								: " cursor-pointer hover:bg-[rgba(255,255,255,0.5)] "
						} flex items-center justify-between px-2 py-1.5 w-44 rounded-normal transition-all duration-500 ease-in-out min-w-0`}
						onClick={() => changeTab(tab)}
					>
						<div
							className={`flex w-full items-center flex-row cursor-default ${
								tab.active ? "text-black" : "text-blueText"
							}`}
						>
							{tabIcons.find((t) => t.title === tab.title)?.icon ||
								(tab.active ? <IconBook size={20} /> : <IconBook2 size={20} />)}
							<span className="ml-0.5 text-xs font-medium  whitespace-nowrap w-[6.5rem] text-ellipsis overflow-hidden">
								{tab.title}
							</span>
							<div className="flex gap-0.5 ml-auto">
								{tab.active && (
									<>
										<IconPin
											className="cursor-pointer text-gray-400 hover:text-black"
											size={13}
										/>
										<IconX
											className="cursor-pointer text-gray-400 hover:text-black"
											onClick={(e) => closeTab(e, tab)}
											size={13}
										/>
									</>
								)}
							</div>
						</div>
					</div>
				))}
				<div
					className="rounded-normal hover:bg-gray-300 flex items-center p-1.5 cursor-pointer"
					onClick={addTab}
				>
					<IconPlus size={18} className="text-gray-400 " />
				</div>
			</div>
			{children}
		</div>
	);
};
