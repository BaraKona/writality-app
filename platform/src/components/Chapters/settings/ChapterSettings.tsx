import { Divider, ScrollArea, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React, { FC } from "react";

export const ChapterSettings: FC<{}> = ({}) => {
	return (
		<div className="min-w-auto w-56">
			<div>
				<div className="flex font-medium my-2 px-2 text-blueText text-sm">
					Settings
					<IconPlus
						size={18}
						className="ml-auto hover:text-black cursor-pointer"
					/>
				</div>
				<Divider className="border-gray-200" />
				<ScrollArea.Autosize
					mah={400}
					offsetScrollbars
					scrollbarSize={6}
					className="px-2"
				>
					<TextInput
						variant="unstyled"
						label="Chapter Name"
						placeholder="Chapter Name"
						className=" border-none p-0 text-sm"
					/>
				</ScrollArea.Autosize>
			</div>
		</div>
	);
};
