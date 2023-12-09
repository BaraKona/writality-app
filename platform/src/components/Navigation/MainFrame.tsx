import { FC, ReactNode } from "react";
import {
  IconBook,
  IconBook2,
  IconBooks,
  IconHelp,
  IconSettings,
  IconTemplate,
  IconX,
  IconPlus,
  IconUserCircle,
  IconMoon,
  IconSun,
  IconSocial,
} from "@tabler/icons-react";
import { useTabContext } from "../../contexts/TabContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useThemeContext } from "../../Providers/ThemeProvider";
import { IconUsersGroup } from "@tabler/icons-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
    {
      title: "Writing-groups",
      icon: <IconSocial size={18} />,
    },
  ];

  const closeTab = (
    e: React.MouseEvent<SVGElement>,
    tab: { path: string; title: string; id: string; active: boolean },
  ) => {
    e.stopPropagation();
    const index = tabs.findIndex((t) => t.active);
    const prevTab = tabs[index - 1];
    const nextTab = tabs[index + 1];

    if (tab.active) {
      if (prevTab) {
        prevTab.active = true;
        navigate(prevTab.path);
      }

      if (!prevTab && nextTab) {
        nextTab.active = true;
        navigate(nextTab.path);
      }
    }
    const newTabs = tabs.filter((t) => t.id !== tab.id);
    console.log(newTabs);
    setTabs(newTabs);
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

  const [parent] = useAutoAnimate();

  return (
    <div className="flex min-w-[992px] grow flex-col gap-1.5 overflow-auto">
      <div className=" flex content-start items-center gap-1 pl-2" ref={parent}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={` ${
              tab.active
                ? "cursor-default border border-border bg-base hover:bg-base dark:border-hoverDark dark:bg-hoverDark hover:dark:bg-hoverDark"
                : "cursor-pointer border border-primary"
            } group flex w-44 min-w-0 items-center justify-between rounded-lg border border-border bg-base px-2 py-1.5 transition-all duration-500  ease-in-out hover:bg-base dark:border-borderDark dark:bg-baseDark hover:dark:bg-baseDark`}
            onClick={() => changeTab(tab)}
          >
            <div
              className={`flex w-full flex-row items-center text-coolGrey-7 dark:text-coolGrey-4`}
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
              <span className="ml-0.5 w-[6.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium">
                {tab.title}
              </span>
              <button className="ml-auto flex gap-0.5">
                <IconX
                  className={`"cursor-pointer text-coolGrey-4 hover:text-black dark:hover:text-coolGrey-1  ${
                    tab.active ? "block" : "hidden group-hover:block"
                  }`}
                  onClick={(e) => closeTab(e, tab)}
                  size={13}
                />
              </button>
            </div>
          </div>
        ))}
        <div
          className="flex cursor-pointer items-center rounded-lg p-1.5 hover:bg-coolGrey-1 dark:hover:bg-hoverDark"
          onClick={addTab}
        >
          <IconPlus size={14} className="text-coolGrey-4" />
        </div>
        <div
          className="ml-auto cursor-pointer rounded-lg  border border-border p-2 py-1.5 dark:border-borderDark"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <IconMoon size={14} className="text-cyan-500" />
          ) : (
            <IconSun size={14} className="text-yellow-600" />
          )}
        </div>
      </div>
      <section className="ml-2 h-[calc(100dvh-3rem)] overflow-y-auto !rounded-lg">
        {children}
      </section>
    </div>
  );
};
