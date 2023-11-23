import { FC } from "react";
import { IUser } from "../../interfaces/IUser";
import { UserCountryRenderer } from "../UserCountryRenderer";
import { initials, initialsColor } from "../../utils/userIcons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";
import { useAddBookmark } from "../../hooks/user/useAddBookmark";
import { useRemoveBookmark } from "../../hooks/user/useRemoveBookmark";

export const UserCard: FC<{ user: IUser }> = ({ user }) => {
	const navigate = useNavigate();
	const { currentUser } = useAuthContext();
	const { mutate: addBookmark } = useAddBookmark();
	const { mutate: removeBookmark } = useRemoveBookmark();

	return (
		<div
			onClick={() => navigate(`/users/${user.uid}`)}
			className="flex relative flex-col rounded-lg basis-[25rem] h-[25rem] max-w-[314px] hover:border-coolGrey-3 dark:hover:shadow-none shadow dark:hover:border-coolGrey-5 shadow\ hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
		>
			<div className="h-24 w-full rounded-t-lg bg-gradient-to-tr  from-pink-600/60 via-pink-700/60 to-amber-600/80 flex items-center justify-center" />
			<div className="w-20 h-20 rounded-full bg-coolGrey-1/70 dark:bg-borderDark/70 flex items-center justify-center absolute right-0 left-0 mx-auto top-14 border-base dark:border-baseDark dark:border-baseBorder border-[0.5rem]">
				<div
					className={`text-2xl font-bold truncate  ${initialsColor(
						user.name
					)} -mt-1`}
				>
					{initials(user.name)}
				</div>
			</div>
			{currentUser.bookmarks.some((bookmark: any) =>
				bookmark.url.includes(user.uid)
			) ? (
				<div className="absolute top-2 right-2 text-coolGrey-3 hover:text-coolGrey-7 dark:text-coolGrey-4 hover:bg-coolGrey-1 dark:hover:bg-hoverDark  group-hover:visible transition-all ease-in-out duration-300 p-2 rounded-lg">
					<IconBookmarkFilled
						size={18}
						onClick={(e) => {
							e.stopPropagation(), removeBookmark(`/users/${user.uid}`);
						}}
					/>
				</div>
			) : (
				<button
					className={`absolute top-2 right-2 text-coolGrey-3 hover:text-coolGrey-7 dark:text-coolGrey-4 hover:bg-coolGrey-1 dark:hover:bg-hoverDark  group-hover:visible transition-all ease-in-out duration-300 p-2 rounded-lg`}
					onClick={(e) => {
						e.stopPropagation(),
							addBookmark({
								url: `/users/${user.uid}`,
								name: user.name,
								type: "user",
							});
					}}
				>
					<IconBookmarkPlus size={18} />
				</button>
			)}
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
