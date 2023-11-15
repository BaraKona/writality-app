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
			className="flex flex-col gap-2 rounded-lg border-border border dark:border-borderDark p-2 basis-80 h-80 max-w-[300px] hover:border-coolGrey-3 dark:hover:shadow-none dark:hover:border-coolGrey-5 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
		>
			<div className="flex gap-2">
				<div className="w-12 h-12 rounded-full bg-coolGrey-1/70 dark:bg-borderDark flex items-center justify-center">
					<div
						className={`text-xl font-bold truncate -mt-1 ${initialsColor(
							user.name
						)}`}
					>
						{initials(user.name)}
					</div>
				</div>

				<div className="flex flex-col">
					<span className="text-lg font-bold">{user.name}</span>
					<span className="text-sm text-coolGrey-5 dark:text-coolGrey-4 truncate">
						{user.email}
					</span>
				</div>
			</div>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
			<UserCountryRenderer country={user.country} />
			<div className="text-sm text-coolGrey-5 dark:text-coolGrey-5 h-24 line-clamp-5">
				{user.aboutMe || "User has not written anything about themselves yet."}
			</div>

			<Divider mt="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<div className="flex gap-1.5 flex-wrap">
				{user.roles?.length === 0 && (
					<span className="text-xs rounded-lg bg-coolGrey-1 dark:bg-borderDark px-2 py-1 capitalize">
						No roles
					</span>
				)}
				{user.roles?.slice(0, 4).map((role) => (
					<span
						className="text-xs rounded-lg bg-coolGrey-1 dark:bg-borderDark px-2 py-1 capitalize"
						key={role}
					>
						{role}
					</span>
				))}
			</div>
		</div>
	);
};
