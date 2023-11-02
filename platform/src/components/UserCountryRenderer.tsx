import { FC } from "react";
import { countriesList, flags } from "../utils/countriesList";

export const UserCountryRenderer: FC<{ country?: string }> = ({ country }) => {
	return (
		<div className="flex gap-2 items-center">
			<span className="text-xl">
				{country ? (
					flags[country]
				) : (
					<div className="w-6	h-4 bg-coolGrey-2 dark:bg-hoverDark rounded" />
				)}
			</span>
			<span className="text-sm">
				{country
					? Object.entries(countriesList).find(
							([key, value]) => value.code === country
					  )?.[1].label
					: "Unknown"}
			</span>
		</div>
	);
};
