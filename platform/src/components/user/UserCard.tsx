import { FC } from "react";
import { IUser } from "../../interfaces/IUser";
import { Divider } from "@mantine/core";
import { UserCountryRenderer } from "../UserCountryRenderer";
import { initials, initialsColor } from "../../utils/userIcons";
import { useNavigate } from "react-router-dom";

export const UserCard: FC<{ user: IUser }> = ({ user }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`/users/${user.uid}`)}
			className="flex relative flex-col rounded-lg basis-[25rem] h-[25rem] max-w-[314px] hover:border-coolGrey-3 dark:hover:shadow-none shadow dark:hover:border-coolGrey-5 shadow\ hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
		>
			<div className="h-24 w-full rounded-t-lg bg-gradient-to-tr from-coolGrey-1 to-coolGrey-2 dark:from-pink-600/70 dark:via-pink-700/70 dark:to-amber-600/80 flex items-center justify-center" />
			<div className="w-20 h-20 rounded-full bg-coolGrey-1/70 dark:bg-borderDark flex items-center justify-center absolute right-0 left-0 mx-auto top-14 border-base dark:border-baseDark dark:border-baseBorder border-[0.5rem]">
				<div
					className={`text-2xl font-bold truncate  ${initialsColor(
						user.name
					)} -mt-1`}
				>
					{initials(user.name)}
				</div>
			</div>
			<div className="p-2 dark:border dark:border-borderDark border-t-none rounded-b-lg grow dark:hover:border-coolGrey-1/30 flex flex-col">
				<div className="flex flex-col text-center mt-8 items-center">
					<span className="text-lg font-bold">{user.name}</span>
					<span className="text-sm text-coolGrey-5 dark:text-coolGrey-4 truncate">
						{user.email}
					</span>
					<UserCountryRenderer country={user.country} />
				</div>
				<div className="text-sm text-coolGrey-5 dark:text-coolGrey-5 h-[6.5rem] line-clamp-5 mt-2">
					{user.aboutMe ||
						"User has not written anything about themselves yet."}
				</div>

				<div className="flex gap-1.5 flex-wrap mt-auto h-14 line-clamp-2 ">
					{user.roles?.length === 0 && (
						<span className="text-xs rounded-lg bg-coolGrey-1 dark:bg-borderDark px-2 py-1 capitalize h-6">
							No roles
						</span>
					)}
					{user.roles?.map((role) => (
						<span
							className="text-xs rounded-lg bg-coolGrey-1 dark:bg-fuchsia-700 dark:text-coolGrey-8 px-2 py-1 capitalize h-6"
							key={role}
						>
							{role}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
