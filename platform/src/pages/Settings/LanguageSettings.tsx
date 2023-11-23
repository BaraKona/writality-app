import { Divider, MultiSelect, Select, Text } from "@mantine/core";
import { useUser } from "../../hooks/user/useUser";
import { inputStyles } from "../../styles/inputStyles";
import { BlueButton } from "../../components/buttons/BlueButton";
import { useUpdateUserData } from "../../hooks/user/useUpdateUserData";
import { useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { languages } from "../../utils/languagesList";
import { SmallText } from "../../components/texts/SmallText";

export const LanguageSettings = () => {
	const { data: user } = useUser();
	const { mutate: updateUserData } = useUpdateUserData();
	const [userState, setUserState] = useState<IUser>({ ...user });

	const hasUpdated = () => {
		if (userState.languages !== user?.languages) return true;
		if (userState.primaryLanguage !== user?.primaryLanguage) return true;
		return false;
	};

	return (
		<div className="h-[calc(100dvh-7.5rem)] place-items-center rounded-lg border border-border dark:border-borderDark bg-base dark:bg-baseDark px-3 py-2 overflow-y-auto">
			<div className="max-w-lg mx-auto mt-10">
				<Text
					size={20}
					className=" font-medium text-coolGrey-7 dark:text-coolGrey-5"
				>
					Language
				</Text>
				<SmallText>Manage your language preferences</SmallText>
				<Divider
					my="xs"
					className="!border-coolGrey-1 dark:!border-borderDark"
				/>

				<MultiSelect
					label="Languages"
					placeholder="Search your languages"
					description="What languages do you speak?"
					defaultValue={user?.languages}
					onChange={(value) => setUserState({ ...userState, languages: value })}
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
				<Select
					label="Primary language"
					placeholder="Your primary language"
					description="What is your primary language for writing?"
					defaultValue={user?.primaryLanguage}
					onChange={(value) =>
						setUserState({ ...userState, primaryLanguage: value as string })
					}
					className="w-full"
					styles={inputStyles()}
					data={languages}
					searchable
					nothingFound="Nothing found"
				/>

				<div className="ml-auto max-w-[100px]">
					<BlueButton
						onClick={() => updateUserData(userState)}
						disabled={!hasUpdated()}
					>
						Save
					</BlueButton>
				</div>
			</div>
		</div>
	);
};
