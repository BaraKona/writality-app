import { IconHelp, IconBrandDiscord } from "@tabler/icons-react";

export const HelpPage = () => {
	return (
		<section className="h-[calc(100dvh-3rem)] flex dark:bg-baseDark rounded-lg border border-border dark:border-borderDark bg-base items-center flex-col justify-center">
			<div className="flex gap-4 -mt-10 items-center">
				<IconHelp size={48} className="animate-pulse self-start mt-2" />
				<div className="flex flex-col">
					<h1 className="text-md font-bold">Help pages...</h1>
					<p className="text-sm">
						Coming very soon... <br />
						In the meantime, you can join our Discord server for help and
						support.
					</p>
					<a
						href="https://discord.gg/nkkBJCEdGK"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2 text-sm font-medium text-coolGrey-7 dark:text-coolGrey-4 bg-coolGrey-1 dark:hover:bg-baseDarker hover:bg-coolGrey-2 transition-all ease-in-out duration-300 dark:bg-hoverDark mr-auto p-3 px-6 self-start rounded-lg mt-4"
					>
						<IconBrandDiscord size={24} />
						Join Discord
					</a>
				</div>
			</div>
		</section>
	);
};
