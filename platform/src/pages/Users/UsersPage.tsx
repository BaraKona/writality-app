import { usePublicUsers } from "../../hooks/user/usePublicUsers";
import { IconUsersGroup } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { BannerImage } from "../../components/BannerImage";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../components/user/UserCard";
export const UsersPage = () => {
	const { data: users } = usePublicUsers();
	const navigate = useNavigate();

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

				<div className="flex gap-2 flex-wrap">
					{users?.map((user: IUser, index: number) => (
						<UserCard user={user} key={index} />
					))}
				</div>
			</div>
		</section>
	);
};
