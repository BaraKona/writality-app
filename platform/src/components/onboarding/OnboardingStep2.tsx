import { FC } from "react";
import { BlueButton } from "../buttons/BlueButton";
import { MultiSelect, Select } from "@mantine/core";
import { AuthTitle } from "../auth/AuthTitle";
import { IUser } from "../../interfaces/IUser";
import { inputStyles } from "../../styles/inputStyles";
import { countriesList } from "../../utils/countriesList";
import { languages } from "../../utils/languagesList";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IconChevronLeft } from "@tabler/icons-react";

export const OnboardingStep2: FC<{
	next: () => void;
	back: () => void;
	user: IUser;
	setUser: (user: IUser) => void;
}> = ({ next, user, setUser, back }) => {
	const [parent] = useAutoAnimate();

	return (
		<section className="w-full flex flex-col grow">
			<AuthTitle
				title="Introduction"
				subtitle="Tell us a little about yourself"
			/>
			<section className="flex flex-col gap-4 max-w-lg grow" ref={parent}>
				<Select
					label="Country"
					placeholder="Your country"
					description="Where do you live?"
					defaultValue={user?.country}
					onChange={(value) => setUser({ ...user, country: value as string })}
					className="w-full"
					styles={inputStyles()}
					data={countriesList}
					searchable
					nothingFound="Nothing found"
				/>
				{user?.country && (
					<Select
						label="Primary language"
						placeholder="Your primary language"
						description="What is your primary language for writing?"
						defaultValue={user?.primaryLanguage}
						onChange={(value) =>
							setUser({ ...user, primaryLanguage: value as string })
						}
						className="w-full"
						styles={inputStyles()}
						data={languages}
						searchable
						nothingFound="Nothing found"
					/>
				)}

				{user?.primaryLanguage && (
					<MultiSelect
						label="Languages"
						placeholder="Search your languages"
						description="What languages do you speak?"
						defaultValue={user?.languages}
						onChange={(value) => setUser({ ...user, languages: value })}
						className="w-full"
						styles={{
							...inputStyles(),
							input: {
								...inputStyles().input,
								margin: "0",
							},
						}}
						data={languages}
						searchable
						nothingFound="Nothing found"
						limit={5}
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
						disabled={
							!user?.country || !user?.primaryLanguage || !user?.languages
						}
					>
						Next
					</BlueButton>
				</div>
			</section>
		</section>
	);
};
