import { FC, ReactNode } from "react";
import {
	IconBook,
	IconBook2,
	IconBooks,
	IconHelp,
	IconLayoutDashboard,
	IconPin,
	IconSettings,
	IconTemplate,
	IconX,
} from "@tabler/icons";
import { useTabContext } from "../../contexts/TabContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export const MainFrame: FC<{
	children: ReactNode;
	tabName?: string;
}> = ({ children, tabName }) => {
	const { setTabs, tabs } = useTabContext();
	const navigate = useNavigate();
	const location = useLocation();
	const { project, chapter } = useParams();
	const pathname = project
		? location.pathname.split("/")[1] + "/" + project
		: location.pathname.split("/")[1];

	const tab = tabs.find((tab) => tab.id === pathname);

	// Add chapter to tab path if chapter exists
	if (chapter) {
		if (tab) {
			if (!tab.path.includes(chapter)) {
				tab.path = tab.path + "/chapter/" + chapter;
			}
		}
	}

	// Remove chapter from tab path if chapter does not exist
	if (!chapter) {
		if (tab) {
			if (tab.path.includes("chapter")) {
				tab.path = tab.path.split("/chapter/")[0];
			}
		}
	}

	// check if tab already exists
	const tabExists = tabs.some((tab) => tab.id === pathname);
	// if tab does not exist, add it to the tabs array
	if (!tabExists) {
		setTabs([
			...tabs,
			{
				path: location.pathname,
				title:
					location.pathname.split("/")[1][0].toUpperCase() +
					location.pathname.split("/")[1].slice(1),
				id: pathname,
			},
		]);
	}

	const tabIcons = [
		{
			title: "Dashboard",
			icon: <IconLayoutDashboard size={20} />,
		},
		{
			title: "Stories",
			icon: <IconBooks size={20} />,
		},
		{
			title: "Posts",
			icon: <IconTemplate size={20} />,
		},
		{
			title: "Settings",
			icon: <IconSettings size={20} />,
		},
		{
			title: "Help",
			icon: <IconHelp size={20} />,
		},
	];

	const closeTab = (
		e: React.MouseEvent<SVGElement>,
		tab: { path: string; title: string; id: string }
	) => {
		e.stopPropagation();
		if (tabs.length === 1) navigate("/dashboard");
		setTabs(tabs.filter((t) => t.id !== tab.id));
		if (tab.id === pathname) {
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
		<div className="">
			<div className="mt-3 flex overflow-x-auto w-[calc(100vw-12rem)]">
				{tabs.map((tab) => (
					<div
						key={tab.id}
						className={` ${
							tab.id === pathname && "bg-white rounded-t-2xl"
						}  flex items-center justify-between px-2 py-2 w-44 rounded-t-2xl `}
						onClick={() => navigate(tab.path)}
					>
						<div
							className={`flex w-full items-center flex-row cursor-default ${
								tab.id === pathname ? "text-black" : "text-blueText"
							}`}
						>
							{tabIcons.find((t) => t.title === tab.title)?.icon ||
								(tab.id === pathname ? (
									<IconBook size={20} />
								) : (
									<IconBook2 size={20} />
								))}
							<span className="ml-1 text-xs font-medium  whitespace-nowrap w-[6.5rem] text-ellipsis overflow-hidden">
								{tabName ? tabName : tab.title}
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
