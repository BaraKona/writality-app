import {
	Divider,
	MultiSelect,
	Select,
	TextInput,
	Textarea,
} from "@mantine/core";
import { useUser } from "../../hooks/user/useUser";
import { inputStyles } from "../../styles/inputStyles";
import { SmallText } from "../../components/texts/SmallText";
import { useTimeFromNow, useDefaultDate } from "../../hooks/useTimeFromNow";
import { countriesList, flags } from "../../utils/countriesList";
import { interestList, preferenceList } from "../../utils/interestList";
import { BlueButton } from "../../components/buttons/BlueButton";
import { useUpdateUserData } from "../../hooks/user/useUpdateUserData";
import { useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { has } from "cheerio/lib/api/traversing";
export const ProfileSettings = () => {
	const { data: user } = useUser();
	const { mutate: updateUserData } = useUpdateUserData();
	const [userState, setUserState] = useState<IUser>({ ...user });

	countriesList.map((country) => {
		return { value: country, label: country };
	});

	const hasUpdated = () => {
		if (userState.name !== user?.name) return true;
		if (userState.aboutMe !== user?.aboutMe) return true;
		if (userState.country !== user?.country) return true;
		if (userState.interests !== user?.interests) return true;
		if (userState.roles !== user?.roles) return true;
		return false;
	};

	return (
		<div className="h-[calc(100vh-6.4rem)] place-items-center rounded-normal border border-border bg-base px-3 py-2 overflow-y-auto">
			<div className="max-w-lg mx-auto mt-16">
				<div className="text-lg font-medium text-blueText"> Profile </div>
				<div className="text-sm text-"> Manage your Writality profile </div>
				<Divider className="my-2 mb-8 border-border" />
				<SmallText>Member since: </SmallText>
				<SmallText light>{useDefaultDate(user.createdAt)}</SmallText>
				<div className="my-5">
					<SmallText>Email</SmallText>
					<SmallText light>{user?.email}</SmallText>
				</div>
				<TextInput
					label="Username"
					placeholder="Username"
					defaultValue={user?.name}
					className="w-full"
					styles={inputStyles}
					onChange={(e) => setUserState({ ...userState, name: e.target.value })}
				/>
				<Textarea
					label="About me"
					placeholder="About me"
					description="Tell us about yourself"
					defaultValue={user?.aboutMe}
					onChange={(e) =>
						setUserState({ ...userState, aboutMe: e.target.value })
					}
					className="w-full"
					styles={inputStyles}
					minRows={5}
					maxRows={7}
				/>
				<MultiSelect
					label="Interests"
					placeholder="Interests"
					description="What are your interests?"
					defaultValue={user?.interests}
					onChange={(value) => setUserState({ ...userState, interests: value })}
					className="w-full"
					styles={{
						...inputStyles,
						input: {
							...inputStyles.input,
							margin: "0",
						},
					}}
					data={interestList}
					searchable
					nothingFound="Nothing found"
				/>
				<MultiSelect
					label="Roles"
					placeholder="Roles"
					description="What roles would you like to have?"
					defaultValue={user?.roles}
					onChange={(value) => setUserState({ ...userState, roles: value })}
					className="w-full"
					styles={{
						...inputStyles,
						input: {
							...inputStyles.input,
							margin: "0",
						},
					}}
					data={preferenceList}
					searchable
					nothingFound="Nothing found"
					limit={5}
				/>
				<Select
					label="Country"
					placeholder="Your country"
					description="Where are you from? or where do you live?"
					defaultValue={user?.country}
					onChange={(value) =>
						setUserState({ ...userState, country: value as string })
					}
					className="w-full"
					styles={inputStyles}
					data={countriesList}
					searchable
					nothingFound="Nothing found"
				/>
				<BlueButton
					onClick={() => updateUserData(userState)}
					disabled={!hasUpdated()}
				>
					Save
				</BlueButton>
			</div>
		</div>
	);
};
