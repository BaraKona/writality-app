import { FC } from "react";

export const BannerImage: FC<{ image: string; alt: string }> = ({
	image,
	alt,
}) => {
	return (
		<img
			src={image}
			alt={alt}
			className="w-full h-56 first-letter:rounded-normal object-cover rounded-normal"
			loading="lazy"
		/>
	);
};
