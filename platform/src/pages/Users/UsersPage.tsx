import { usePublicUsers } from "../../hooks/user/usePublicUsers";
import { IconUsersGroup } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { BannerImage } from "../../components/BannerImage";
import { Title } from "../../components/Title";
import { UserCard } from "../../components/user/UserCard";
import { Loading } from "../../components/Loading";
export const UsersPage = () => {
	const { data: users } = usePublicUsers();

	if (!users) return <Loading isLoading={true} />;

	return (
		<section className="overflow-y-auto rounded-lg bg-base dark:bg-baseDark">
			<BannerImage
				image="https://images.unsplash.com/photo-1544604860-206456f08229"
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

				<div className="flex gap-2 flex-wrap pb-6">
					{users?.map((user: IUser, index: number) => (
						<UserCard user={user} key={index} />
					))}
				</div>
			</div>
		</section>
	);
};
