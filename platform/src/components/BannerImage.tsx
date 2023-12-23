import { FC } from "react";

export const BannerImage: FC<{
  image: string;
  alt: string;
  height?: string;
  styling?: string;
}> = ({ image, alt, height, styling }) => {
  return (
    <div
      className={`w-full ${height ? height : "h-56"}  rounded-lg bg-coolGrey-1 dark:bg-hoverDark`}
    >
      <img
        src={image}
        alt={alt}
        className={`${styling} h-full w-full rounded-lg object-cover first-letter:rounded-lg`}
        loading="lazy"
      />
    </div>
  );
};
