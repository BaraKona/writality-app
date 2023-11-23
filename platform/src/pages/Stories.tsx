import { IconBooks } from "@tabler/icons-react";

export const Stories = () => {
	return (
		<section className="h-[calc(100dvh-3rem)] flex dark:bg-baseDark rounded-lg border border-border dark:border-borderDark bg-base justify-center items-center">
			<div className="flex gap-4 -mt-10 items-center">
				<IconBooks size={48} className="animate-pulse" />
				<div>
					<h1 className="text-md font-bold">Stories</h1>
					<p className="text-sm">Coming very soon</p>
				</div>
			</div>
		</section>
	);
};
