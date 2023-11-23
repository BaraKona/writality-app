import { IconSocial } from "@tabler/icons-react";

export const WritingGroupsPage = () => {
	return (
		<section className="h-[calc(100dvh-3rem)] flex dark:bg-baseDark rounded-lg border border-border dark:border-borderDark bg-base justify-center items-center">
			<div className="flex gap-4 -mt-10 items-center">
				<IconSocial size={48} />
				<div>
					<h1 className="text-md font-bold">Writing Group</h1>
					<p className="text-sm">Coming very soon...</p>
				</div>
			</div>
		</section>
	);
};
