import { Divider } from "@mantine/core";
import { usePublicUsers } from "../../hooks/user/usePublicUsers";
import { IconUsersGroup } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { countriesList, flags } from "../../utils/countriesList";
import { BannerImage } from "../../components/BannerImage";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { initials, initialsColor } from "../../utils/userIcons";
import { UserCountryRenderer } from "../../components/UserCountryRenderer";
export const UsersPage = () => {
	const { data: users } = usePublicUsers();
	const navigate = useNavigate();

	return (
		<section className="overflow-y-auto rounded-normal bg-base dark:bg-baseDark">
			<BannerImage
				image="https://images.unsplash.com/photo-1607496220321-0c71c2fdbffb?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Post banner"
				styling="!object-center"
			/>
			<div className="max-w-screen-xl mx-auto">
				<Title>
					<div className="flex gap-2">
						<IconUsersGroup size={40} className="dark:text-lime-600" />
						Users
					</div>
				</Title>

				<div className="flex gap-2 flex-wrap">
					{users?.map((user: IUser) => (
						<div
							onClick={() => navigate(`/users/${user.uid}`)}
							className="flex flex-col gap-2 rounded-normal border-border border dark:border-borderDark p-2 basis-80 h-80 max-w-[300px] hover:border-coolGrey-3 dark:hover:shadow-none dark:hover:border-coolGrey-5 hover:shadow-md cursor-pointer transition-all duration-200 ease-in-out"
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
								{user.aboutMe ||
									"User has not written anything about themselves yet."}
							</div>

							<Divider
								mt="xs"
								className="!border-coolGrey-1 dark:!border-borderDark"
							/>
							<div className="flex gap-1.5 flex-wrap">
								{user.roles?.length === 0 && (
									<span className="text-xs rounded bg-coolGrey-1 dark:bg-borderDark px-2 py-1 capitalize">
										No roles
									</span>
								)}
								{user.roles?.slice(0, 4).map((role) => (
									<span
										className="text-xs rounded bg-coolGrey-1 dark:bg-borderDark px-2 py-1 capitalize"
										key={role}
									>
										{role}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
