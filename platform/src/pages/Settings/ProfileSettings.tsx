import {
	Divider,
	MultiSelect,
	Select,
	TextInput,
	Textarea,
	Text,
	Flex,
	SegmentedControl,
	Switch,
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
import { languages } from "../../utils/languagesList";
import { IconEyeClosed } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons";

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
		if (userState.isPublic !== user?.isPublic) return true;
		return false;
	};

	return (
		<div className="h-[calc(100vh-6.4rem)] place-items-center rounded-normal border border-border bg-base px-3 py-2 overflow-y-auto">
			<div className="max-w-lg mx-auto mt-10">
				<div className="flex justify-between items-end">
					<div>
						<Text size={20} className=" font-medium text-blueText">
							Profile
						</Text>
						<Text size={12} color="dimmed">
							Manage your Profile
						</Text>
					</div>
					<Switch
						size="md"
						className=""
						onLabel={<IconEye size="1rem" stroke={2.5} />}
						offLabel={<IconEyeClosed size="1rem" stroke={2.5} />}
						checked={userState.isPublic}
						color="grey-blue"
						onChange={(event) =>
							setUserState({
								...userState,
								isPublic: event.currentTarget.checked,
							})
						}
						styles={{
							track: {
								borderRadius: "0.25rem",
							},

							thumb: {
								borderRadius: "0.25rem",
							},
						}}
						label={
							<div className="mt-1">
								<SmallText>Public Profile</SmallText>
							</div>
						}
					/>
				</div>

				<Divider my="xs" color="grey.0" />

				<div>
					<SmallText>Member since: </SmallText>
					<SmallText light>{useDefaultDate(user.createdAt)}</SmallText>
				</div>
				<div className="my-2">
					<SmallText>Email:</SmallText>
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

				<Text size={20} className=" font-medium text-blueText">
					Location
				</Text>
				<div className="text-sm text-"> Manage your location </div>
				<Divider my="xs" color="grey.0" />
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
