import { FC } from "react";

export const BannerImage: FC<{
	image: string;
	alt: string;
	height?: string;
}> = ({ image, alt, height }) => {
	return (
		<img
			src={image}
			alt={alt}
			className={`w-full ${
				height ? height : "h-56"
			} first-letter:rounded-normal object-cover rounded-normal`}
			loading="lazy"
		/>
	);
};
