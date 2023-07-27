import { FC, ReactNode } from "react";

export const SmallText: FC<{ children: ReactNode; light?: boolean }> = ({
	children,
	light,
}) => {
	if (light) {
		return (
			<div className="text-xs text-blueTextLight font-medium">{children}</div>
		);
	}
	return <div className="text-xs text-blueText font-medium">{children}</div>;
};
