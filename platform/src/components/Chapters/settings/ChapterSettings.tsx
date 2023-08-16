import { Divider, ScrollArea, TextInput } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import React, { FC } from "react";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { inputStyles } from "../../../styles/inputStyles";

export const ChapterSettings: FC<{ close: () => void }> = ({ close }) => {
	return (
		<div className="min-w-auto w-72">
			<div className="flex font-medium my-2 px-2 text-coolGrey-7 gap-2 text-xs items-center">
				Settings
				<ButtonWrapper className="ml-auto" onClick={close}>
					<IconX size={14} className="text-gray-400 group-hover:text-black" />
				</ButtonWrapper>
			</div>
			<Divider color="grey.0" />
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
					styles={inputStyles}
				/>
			</ScrollArea.Autosize>
		</div>
	);
};
