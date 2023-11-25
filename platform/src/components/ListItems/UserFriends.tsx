import { useAuthContext } from "../../contexts/AuthContext";
import { FC } from "react";
import { SmallText } from "../texts/SmallText";
import { Divider } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IUser } from "../../interfaces/IUser";
import { initials, initialsColor } from "../../utils/userIcons";
import { useLocalStorage } from "@mantine/hooks";

export const UserFriends: FC<{}> = () => {
	const { currentUser } = useAuthContext();
	const [parent] = useAutoAnimate();
	const [userChat, setUserChat] = useLocalStorage({
		key: "userChat",
	});

	if (!currentUser?.friends || currentUser?.friends?.length === 0)
		return (
			<section className="grow" ref={parent}>
				<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2 " />
				<SmallText className="text-center" light>
					You have no friends 😔. Your friends will appear here (hopefully
					soonish 🤞) and you can chat with them.
				</SmallText>
			</section>
		);

	return (
		<section className="grow" ref={parent}>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2 " />
			<ul className="flex flex-col gap-1">
				{currentUser?.friends?.map((friend: IUser["friends"][0]) => (
					<li
						key={friend?.user?.uid}
						onClick={() => setUserChat(`${friend?.chat}`)}
						className={`p-2 py-1 gap-1 transition-all ease-in-out duration-500 cursor-pointer flex items-center text-xs font-medium group hover:bg-coolGrey-1 dark:hover:bg-hoverDark rounded-md ${
							userChat?.split("_")[0] === friend?.chat &&
							`bg-coolGrey-1 dark:bg-hoverDark`
						}`}
					>
						{/* <IconUser size={18} /> */}
						<div className=" w-7 h-7 rounded-full bg-base dark:bg-baseDark flex items-center justify-center border border-border dark:border-borderDark">
							<div
								className={`font-bold truncate flex items-center text-xs ${initialsColor(
									friend?.user?.name
								)}`}
							>
								{initials(friend?.user?.name)}
							</div>
						</div>
						{friend?.user?.name}
					</li>
				))}
			</ul>
		</section>
	);
};
