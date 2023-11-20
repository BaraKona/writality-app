import { Divider, ScrollArea, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FC } from "react";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { inputStyles } from "../../../styles/inputStyles";
import { useThemeContext } from "../../../Providers/ThemeProvider";

export const ChapterSettings: FC<{ close: () => void }> = ({ close }) => {
	const { theme } = useThemeContext();
	return (
		<div className="min-w-auto w-72">
			<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center">
				Settings
				<ButtonWrapper className="ml-auto" onClick={close}>
					<IconX
						size={14}
						className="text-coolGrey-4 dark:text-coolGrey-6 group-hover:text-black dark:hover:text-coolGrey-1"
					/>
				</ButtonWrapper>
			</div>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark" />
			<ScrollArea.Autosize
				mah={400}
				offsetScrollbars
				scrollbarSize={6}
				className="px-2"
			>
				<TextInput
					label="Chapter Name"
					placeholder="Chapter Name"
					className="m-1"
					styles={inputStyles()}
				/>
			</ScrollArea.Autosize>
		</div>
	);
};
