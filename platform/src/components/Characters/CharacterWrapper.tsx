import { FC, ReactNode } from "react";

export const CharacterWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="flex-grow border-l bg-baseMid border-border px-3 hover:bg-baseColour">
			<div className="border-b border-border">
				<h3 className="text-center font-semibold">Characters</h3>
			</div>
		</div>
	);
};
