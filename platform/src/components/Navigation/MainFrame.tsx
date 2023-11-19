import { FC, ReactNode } from "react";
import {
	IconBook,
	IconBook2,
	IconBooks,
	IconHelp,
	IconPin,
	IconSettings,
	IconTemplate,
	IconX,
	IconPlus,
	IconUserCircle,
	IconMoon,
	IconSun,
} from "@tabler/icons-react";
import { useTabContext } from "../../contexts/TabContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { IconUsersGroup } from "@tabler/icons-react";

export const MainFrame: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const { setTabs, tabs } = useTabContext();
	const navigate = useNavigate();
	const location = useLocation();
	const { theme, toggleTheme } = useThemeContext();

	const { project, chapter } = useParams();
	const pathname = location.pathname;

	if (pathname.includes("project") && project === undefined) {
		return <div></div>;
	}

	const tab = tabs.find((tab) => tab.active);

	if (!tab) {
		setTabs([
			{
				path: "/profile",
				title: "Profile",
				id: uuidv4(),
				active: true,
			},
		]);
	} else {
		if (tab.path !== pathname + location.search) {
			const index = tabs.findIndex((tab) => tab.active);
			tabs[index].path = pathname + location.search;
			tabs[index].title =
				pathname.split("/")[1].charAt(0).toUpperCase() +
				pathname.split("/")[1].slice(1);
			tabs[index].active = true;
		}
	}

	const tabIcons = [
		{
			title: "Profile",
			icon: <IconUserCircle stroke={2.2} size={18} />,
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
			title: "Users",
			icon: <IconUsersGroup size={18} />,
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
		if (tabs.length === 0) navigate("/profile");
		if (prevTab) {
			prevTab.active = true;
			navigate(prevTab.path);
		}
		if (nextTab) {
			nextTab.active = true;
			navigate(nextTab.path);
		}

		if (!prevTab && !nextTab) {
			navigate("/profile");
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
					path: "/profile",
					title: "Profile",
					id: uuidv4(),
					active: true,
				},
			]);
			navigate("/profile");
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
		navigate(tab.path);
	};

	return (
		<div className="w-[calc(100vw-19rem)] min-w-[992px] overflow-auto">
			<div className="my-1.5 px-2 flex gap-1 content-start items-center">
				{tabs.map((tab) => (
					<div
						key={tab.id}
						className={` ${
							tab.active
								? "bg-base border border-border dark:bg-hoverDark dark:border-hoverDark hover:bg-base hover:dark:bg-hoverDark cursor-default"
								: "border border-primary cursor-pointer"
						} flex items-center justify-between px-2 py-1.5 w-44 bg-base dark:bg-baseDark border border-border dark:border-borderDark hover:bg-base hover:dark:bg-baseDark  rounded-lg transition-all duration-500 ease-in-out min-w-0`}
						onClick={() => changeTab(tab)}
					>
						<div
							className={`flex w-full items-center flex-row text-coolGrey-7 dark:text-coolGrey-4`}
						>
							{tabIcons.find((t) => t.title === tab.title)?.icon ||
								(tab.active ? (
									<IconBook
										size={18}
										className="text-neutral-600 dark:text-stone-500"
									/>
								) : (
									<IconBook2
										size={18}
										className="text-neutral-600 dark:text-stone-500"
									/>
								))}
							<span className="ml-0.5 text-xs font-medium  whitespace-nowrap w-[6.5rem] text-ellipsis overflow-hidden">
								{tab.title}
							</span>
							<div className="flex gap-0.5 ml-auto">
								{tab.active && (
									<>
										<IconPin
											className="cursor-pointer text-coolGrey-4 hover:text-black dark:hover:text-coolGrey-1"
											size={13}
										/>
										<IconX
											className="cursor-pointer text-coolGrey-4 hover:text-black dark:hover:text-coolGrey-1"
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
					className="rounded-lg hover:bg-coolGrey-1 dark:hover:bg-hoverDark flex items-center p-1.5 cursor-pointer"
					onClick={addTab}
				>
					<IconPlus size={14} className="text-coolGrey-4" />
				</div>
				<div
					className="ml-auto p-2 border-border  dark:border-borderDark border rounded-lg py-1.5 cursor-pointer"
					onClick={toggleTheme}
				>
					{theme === "dark" ? (
						<IconMoon size={14} className="text-cyan-500" />
					) : (
						<IconSun size={14} className="text-yellow-600" />
					)}
				</div>
			</div>
			<section className="h-[calc(100dvh-3rem)] !rounded-lg overflow-y-auto mx-2">
				{children}
			</section>
		</div>
	);
};
