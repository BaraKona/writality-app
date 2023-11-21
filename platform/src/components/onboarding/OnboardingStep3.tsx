import { FC } from "react";
import { BlueButton } from "../buttons/BlueButton";
import { IUser } from "../../interfaces/IUser";
import { AuthTitle } from "../auth/AuthTitle";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MultiSelect, Textarea } from "@mantine/core";
import { inputStyles } from "../../styles/inputStyles";
import { interestList, preferenceList } from "../../utils/interestList";
import { IconChevronLeft } from "@tabler/icons-react";

export const OnboardingStep3: FC<{
	next: () => void;
	back: () => void;
	user: IUser;
	isLoading: boolean;
	setUser: (user: IUser) => void;
}> = ({ next, user, setUser, back, isLoading }) => {
	const [parent] = useAutoAnimate();

	return (
		<section className="w-full flex flex-col grow">
			<AuthTitle
				title="Let's dig deeper"
				subtitle="Tell us a litttttle more about yourself"
			/>
			<section
				className="my-auto flex flex-col gap-4 max-w-lg grow"
				ref={parent}
			>
				<MultiSelect
					label="Interests"
					placeholder="Interests"
					description="What are your interests?"
					defaultValue={user?.interests}
					onChange={(value) => setUser({ ...user, interests: value })}
					className="w-full"
					styles={{
						...inputStyles(),
						input: {
							...inputStyles().input,
							margin: "0",
						},
					}}
					data={interestList}
					searchable
					nothingFound="Nothing found"
				/>
				{user?.interests && (
					<MultiSelect
						label="Roles"
						placeholder="Roles"
						description="What roles would you like to have?"
						defaultValue={user?.roles}
						onChange={(value) => setUser({ ...user, roles: value })}
						className="w-full"
						styles={{
							...inputStyles(),
							input: {
								...inputStyles().input,
								margin: "0",
							},
						}}
						data={preferenceList}
						searchable
						nothingFound="Nothing found"
						limit={5}
					/>
				)}
				{user?.roles && user?.interests && (
					<Textarea
						label="About me"
						placeholder="About me"
						description="Tell us about yourself"
						defaultValue={user?.aboutMe}
						onChange={(e) => setUser({ ...user, aboutMe: e.target.value })}
						className="w-full"
						styles={inputStyles()}
						minRows={5}
						maxRows={7}
					/>
				)}
				<div className="flex gap-2 mt-auto">
					<button
						className=" border border-border dark:border-borderDark rounded-md text-coolGrey-5 px-1.5 hover:bg-coolGrey-1 dark:hover:bg-baseDark transition-colors"
						onClick={back}
					>
						<IconChevronLeft size={18} />
					</button>
					<BlueButton
						className="mt-auto max-w-[100px]"
						onClick={next}
						isLoading={isLoading}
						disabled={!user?.interests || !user?.roles || !user?.aboutMe}
					>
						Finish up
					</BlueButton>
				</div>
			</section>
		</section>
	);
};
