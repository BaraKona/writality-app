import { FC, useState } from "react";
import { BannerImage } from "../../components/BannerImage";
import { useSingleUser } from "../../hooks/user/useSingleUser";
import { useParams } from "react-router-dom";
import { initials, initialsColor } from "../../utils/userIcons";
import { UserCountryRenderer } from "../../components/UserCountryRenderer";
import { ReadMoreText } from "../../components/ReadMoreText";
import { IconClock } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { circle4 } from "../../assets/icons";
export const SingleUserPage: FC<{}> = () => {
	const { userId } = useParams();
	const { data: user } = useSingleUser(userId as string);

	const maxTextLength = 400;
	const [isExpanded, setIsExpanded] = useState(false);

	if (!user) {
		return null;
	}

	return (
		<section className="relative overflow-y-auto rounded-normal">
			<BannerImage
				image="https://images.unsplash.com/photo-1544604860-206456f08229"
				alt="Post banner"
				styling="rounded-br-none"
			/>
			<div className="absolute top-[10.5rem] left-16 w-28 h-28 rounded-full !bg-coolGrey-2/70 dark:!bg-coolGrey-5/70 dark:bg-borderDark flex items-center justify-center">
				<div
					className={`text-4xl font-bold truncate -mt-1 ${initialsColor(
						user.name
					)}`}
				>
					{initials(user.name)}
				</div>
			</div>

			<div className="flex w-full">
				<div className="w-1/2 px-16 pb-6 relative">
					<p className="right-4 top-4 text-sm flex gap-2 items-center absolute ">
						<IconClock size={20} /> Member since:{" "}
						{new Date(user.createdAt).toLocaleDateString()}
					</p>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col mt-20">
							<h2 className="text-4xl font-bold text-coolGrey-8 dark:text-coolGrey-2">
								{user.name}
							</h2>
							<p>{user.email}</p>
							<UserCountryRenderer country={user.country} />
						</div>
						<h2 className="font-bold my-4">Bio</h2>
						<ReadMoreText
							text={user.aboutMe}
							maxTextLength={maxTextLength}
							errorText="This user has not written anything about themselves yet."
						/>
					</div>
					<h2 className="font-bold my-4">Interests</h2>
					{user.interests.length === 0 && (
						<span className="bg-orange-300  dark:bg-orange-900  capitalize p-2 rounded-normal h-24 w-24 text-sm flex items-center justify-center text-center">
							<img src={circle4} alt="circle4" width={150} height={150} />
						</span>
					)}
					<div className="flex flex-wrap gap-2">
						{user.interests.map((interest: IUser["interests"]) => (
							<span className="bg-orange-300  dark:bg-orange-900 capitalize p-2 rounded-normal h-24 w-24 text-sm flex items-center justify-center text-center">
								{interest}
							</span>
						))}
					</div>
					<h2 className="font-bold my-4">Roles</h2>
					{user.roles.length === 0 && (
						<span className="bg-rose-400 dark:bg-pink-950 capitalize p-2 rounded-normal h-24 w-24 text-sm flex items-center justify-center text-center">
							<img src={circle4} alt="circle4" width={150} height={150} />
						</span>
					)}
					<div className="flex flex-wrap gap-2">
						{user.roles.map((role: IUser["roles"]) => (
							<span className="bg-rose-400 dark:bg-pink-950 capitalize p-2 rounded-normal h-24 w-24 text-sm flex items-center justify-center text-center">
								{role}
							</span>
						))}
					</div>
				</div>
				<div className="w-1/2 dark:bg-black/70 bg-[#7d2d33]"></div>
			</div>
		</section>
	);
};