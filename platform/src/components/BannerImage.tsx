import { FC } from "react";

export const BannerImage: FC<{
	image: string;
	alt: string;
	height?: string;
	styling?: string;
}> = ({ image, alt, height, styling }) => {
	return (
		<div
			className={`w-full ${
				height ? height : "h-56"
			}  bg-coolGrey-1 dark:bg-hoverDark rounded-lg`}
		>
			<img
				src={image}
				alt={alt}
				className={`${styling} w-full h-full first-letter:rounded-lg object-cover rounded-lg`}
				loading="lazy"
			/>
		</div>
	);
};
