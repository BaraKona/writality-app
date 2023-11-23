import { Divider } from "@mantine/core";
import { SmallText } from "../texts/SmallText";
import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const UserWritingGroups: FC<{}> = () => {
	const [parent] = useAutoAnimate();
	return (
		<section className="grow" ref={parent}>
			<Divider className="!border-coolGrey-1 dark:!border-borderDark !mb-2 " />
			<SmallText className="text-center" light>
				Writing Groups (coming soon).
			</SmallText>
		</section>
	);
};
