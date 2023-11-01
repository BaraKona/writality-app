import { Divider } from "@mantine/core";
import { usePublicUsers } from "../../hooks/user/usePublicUsers";
import { IconUsersGroup } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { countriesList, flags } from "../../utils/countriesList";
export const UsersPage = () => {
	const { data: users } = usePublicUsers();

	const initials = (name: string) => {
		return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
	};

	const initialsColor = (name: string) => {
		const colors = [
			"text-lime-600",
			"text-green-600",
			"text-emerald-600",
			"text-teal-600",
			"text-cyan-600",
			"text-lightBlue-600",
			"text-blue-600",
			"text-indigo-600",
			"text-violet-600",
			"text-purple-600",
			"text-fuchsia-600",
			"text-pink-600",
			"text-rose-600",
		];

		const index = name.length % colors.length;

		return colors[index];
	};

	return (
		<section className="h-[calc(100vh-3.2rem)] rounded-normal border border-border dark:border-borderDark bg-base dark:bg-baseDark px-3 py-2">
			<div className="max-w-screen-lg mx-auto">
				<h1 className="text-md font-bold flex gap-2 items-center">
					{" "}
					<IconUsersGroup size={40} className="dark:text-lime-600" />
					Users
				</h1>
				<Divider
					my="xs"
					className="!border-coolGrey-1 dark:!border-borderDark"
				/>
				<div className="flex gap-2 flex-wrap">
					{users?.map((user: IUser) => (
						<div className="flex flex-col gap-2 rounded-normal border-border border dark:border-borderDark p-2 basis-64 max-w-[250px] hover:border-coolGrey-3 dark:hover:shadow-none dark:hover:border-coolGrey-5 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out">
							<div className="flex gap-2">
								<div className="w-12 h-12 rounded-full bg-coolGrey-1/70 dark:bg-borderDark flex items-center justify-center">
									<div
										className={`text-xl font-bold  -mt-1 ${initialsColor(
											user.name
										)}`}
									>
										{initials(user.name)}
									</div>
								</div>

								<div className="flex flex-col">
									<span className="text-lg font-bold">{user.name}</span>
									<span className="text-sm text-coolGrey-5 dark:text-coolGrey-4">
										{user.email}
									</span>
								</div>
							</div>
							<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
							<div className="flex gap-2 items-center">
								<span className="text-xl">
									{user.country ? (
										flags[user.country]
									) : (
										<div className="w-6	h-4 bg-coolGrey-3 rounded" />
									)}
								</span>
								<span className="text-sm">
									{user.country
										? Object.entries(countriesList).find(
												([key, value]) => value.code === user.country
										  )?.[1].label
										: "Unknown"}
								</span>
							</div>
							<div className="text-sm text-coolGrey-5 dark:text-coolGrey-5">
								{user.aboutMe ||
									"User has not written anything about themselves yet."}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
