import { FC } from "react";
import { Tabs, Tooltip } from "@mantine/core";
import { SettingsHeader } from "../../components/settings/SettingsHeader";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { tabStyles } from "../../styles/tabStyles";
import { useNavigate, useParams } from "react-router-dom";
import { IconUser, IconVocabulary } from "@tabler/icons-react";
import { ProfileSettings } from "./ProfileSettings";
import { LanguageSettings } from "./LanguageSettings";
export const SettingsPage: FC<{}> = () => {
	const navigate = useNavigate();
	const { settingsTab } = useParams();

	return (
		<div className="h-[calc(100dvh-3.2rem)] place-items-center rounded-lg border border-border dark:border-borderDark bg-base dark:bg-baseDark px-3 py-2  ">
			<SettingsHeader tab={settingsTab} />
			<Tabs
				className="w-full border-none important:border-none h-[calc(100dvh-7.0rem)]"
				value={settingsTab}
				onTabChange={(tab) => navigate(`/settings/${tab}`)}
				defaultValue="home"
				radius={"md"}
				orientation="vertical"
				styles={tabStyles}
				keepMounted={false}
			>
				<Tabs.List>
					<Tooltip
						label="Profile"
						position="right"
						withArrow
						styles={tooltipStyles}
					>
						<Tabs.Tab value="profile">
							<IconUser size={18} />
						</Tabs.Tab>
					</Tooltip>

					<Tooltip
						label="Language"
						position="right"
						withArrow
						styles={tooltipStyles}
					>
						<Tabs.Tab value="language">
							<IconVocabulary size={18} />
						</Tabs.Tab>
					</Tooltip>

					{/* <Divider my="xs" className="border-border dark:border-borderDark" />
					<Tooltip
						label="Settings"
						position="right"
						withArrow
						styles={tooltipStyles}
					>
						<Tabs.Tab value="settings">
							<IconSettings size={18} />
						</Tabs.Tab>
					</Tooltip> */}
				</Tabs.List>
				<Tabs.Panel value="profile">
					<ProfileSettings />
				</Tabs.Panel>
				<Tabs.Panel value="language">
					<LanguageSettings />
				</Tabs.Panel>
			</Tabs>
		</div>
	);
};
