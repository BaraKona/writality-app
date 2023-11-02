import { FC, useState } from "react";

export const ReadMoreText: FC<{
	text?: string;
	maxTextLength: number;
	errorText: string;
}> = ({ text, maxTextLength, errorText }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleReadMore = () => {
		setIsExpanded(!isExpanded);
	};

	if (!text) {
		return <p className="text-sm">{errorText}</p>;
	}

	return (
		<p className="text-sm">
			{isExpanded ? (
				<p>{text}</p>
			) : (
				<p>
					{text?.length > maxTextLength
						? text?.slice(0, maxTextLength) + "..."
						: text || errorText}
				</p>
			)}
			{text?.length > maxTextLength && (
				<button
					className="text-pink-500 cursor-pointer hover:underline"
					onClick={toggleReadMore}
				>
					{isExpanded ? "Read Less" : "Read More"}
				</button>
			)}
		</p>
	);
};
