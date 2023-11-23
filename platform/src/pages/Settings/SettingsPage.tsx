import { FC } from "react";
import { Tabs } from "@mantine/core";
import { tabStyles } from "../../styles/tabStyles";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileSettings } from "./ProfileSettings";
import { LanguageSettings } from "./LanguageSettings";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export const SettingsPage: FC<{}> = () => {
	const navigate = useNavigate();
	const { settingsTab } = useParams();
	const [parent] = useAutoAnimate();
	return (
		<Tabs
			className="border-none important:border-none w-full "
			value={settingsTab}
			onTabChange={(tab) => navigate(`/settings/${tab}`)}
			defaultValue="home"
			radius={"md"}
			styles={tabStyles}
			keepMounted={false}
		>
			<Tabs.List className="flex !items-center !border-none !gap-2">
				<div className="mr-auto cursor-pointer dark:text-coolGrey-4">
					<h2 className="text-3xl font-semibold my-3 mb-5 capitalize">
						{settingsTab}
					</h2>
				</div>

				<div className="flex gap-2 bg-coolGrey-1 dark:bg-hoverDark p-1.5 rounded-lg">
					<Tabs.Tab
						value="profile"
						className="!p-1 font-semibold !px-3 !text-coolGrey-6 dark:bg-transparent dark:!text-coolGrey-4 hover:!bg-coolGrey-7 hover:!text-coolGrey-1 dark:hover:!bg-purple-800/50 transition-all ease-in-out duration-300 !rounded-lg !border-none data-[active]:!bg-coolGrey-7 dark:data-[active]:!text-coolGrey-1 dark:data-[active]:!bg-purple-800 data-[active]:!text-coolGrey-1"
					>
						Profile
					</Tabs.Tab>

					<Tabs.Tab
						value="language"
						className="!p-1 font-semibold !px-3 !text-coolGrey-6 dark:bg-transparent dark:!text-coolGrey-4 hover:!bg-coolGrey-7 hover:!text-coolGrey-1 dark:hover:!bg-purple-800/50 transition-all ease-in-out duration-300 !rounded-lg !border-none data-[active]:!bg-coolGrey-7 dark:data-[active]:!text-coolGrey-1 dark:data-[active]:!bg-purple-800 data-[active]:!text-coolGrey-1"
					>
						Language
					</Tabs.Tab>
				</div>
			</Tabs.List>
			<Tabs.Panel value="profile" ref={parent}>
				<ProfileSettings />
			</Tabs.Panel>
			<Tabs.Panel value="language" ref={parent}>
				<LanguageSettings />
			</Tabs.Panel>
		</Tabs>
	);
};
