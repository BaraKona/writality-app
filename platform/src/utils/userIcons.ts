export function getTextColorByBgColor(bgColor: string | undefined): string {
	if (!bgColor) {
		return "#000";
	}
	const rgbColour = hexToRgb(bgColor);
	const luminanceValue = getLuminance(rgbColour[0], rgbColour[1], rgbColour[2]);
	if (luminanceValue > 0.5) {
		return "rgba(0, 0, 0, 0.67)";
	} else {
		return "rgba(255, 255, 255, 0.97)";
	}
}

function hexToRgb(hex: string): number[] {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) return result.map((i) => parseInt(i, 16)).slice(1);
	return [0, 0, 0];
}

/**
 * Gets the luminance of a color where 0 is black and 1 is white
 */
function getLuminance(r: number, g: number, b: number): number {
	const rgb = [r, g, b].map(function (v) {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

export const initialsColor = (name: string) => {
	return "text-coolGrey-7 dark:text-coolGrey-4";
};

export const initials = (name: string) => {
	if (!name) return "??";

	return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
};
