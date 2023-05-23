import { Container } from "@mantine/core";

type Props = {};

export function HomeBanner({}: Props) {
	return (
		<Container
			size="xl"
			className="w-full grid place-items-center m-auto h-52 md:h-72 "
		>
			<div className="group w-full h-3/4 bg-stone-400 rounded-lg shadow-lg flex flex-col justify-center items-center  hover:bg-base transition-all duration-500 ease-in-out hover:border-baseBorderDark hover:border border-transparent">
				<h1 className="text-2xl font-bold text-gray-800 group-hover:text-stone-300 group-hover:underline-offset-2 group-hover:underline text-center sm:text-4xl">
					Welcome to Writality
				</h1>
				<h2 className="text-gray-600 text-center max-w-md group-hover:text-slate-300 text-md sm:text-xl">
					The world's first Collaborative Creative Writing Platform.
				</h2>
			</div>
		</Container>
	);
}
