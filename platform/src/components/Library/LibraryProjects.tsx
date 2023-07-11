import { FC, useCallback, useEffect, useState } from "react";
import { IProject, ProjectType } from "../../interfaces/IProject";
import {
	IconBook2,
	IconAtom,
	IconPlus,
	IconHeartPlus,
	IconHeartMinus,
} from "@tabler/icons";
import { TbHeartFilled } from "react-icons/tb";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TypographyStylesProvider } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { Progress, rem } from "@mantine/core";

export const LibraryProjects: FC<{
	projects: IProject[];
	addFavourite: (projectId: string) => void;
	createProject: () => void;
	removeFavourite: (projectId: string) => void;
}> = ({ projects, createProject, addFavourite, removeFavourite }) => {
	const { currentUser } = useAuthContext();
	const [embla, setEmbla] = useState<Embla | null>(null);
	const [scrollProgress, setScrollProgress] = useState(0);

	const handleScroll = useCallback(() => {
		if (!embla) return;
		const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
		setScrollProgress(progress * 100);
	}, [embla, setScrollProgress]);

	useEffect(() => {
		if (embla) {
			embla.on("scroll", handleScroll);
			handleScroll();
		}
	}, [embla]);
	const navigate = useNavigate();

	return (
		<div>
			<div className="text-xs font-medium mb-2">Your Projects</div>
			<div className="flex flex-wrap">
				<div
					onClick={createProject}
					className="flex flex-col w-64 border border-lightBorder rounded-normal px-4 py-2 hover:shadow-sm cursor-pointer basis-40 mr-4"
				>
					<div className="flex flex-col items-center gap-2">
						<IconPlus size={24} />
						<div className="flex flex-col text-center">
							<div className="text-xs">Click here to create a new project.</div>
						</div>
					</div>
				</div>
				<Carousel
					withIndicators
					height="10rem"
					maw={`calc(100vw - 25rem)`}
					slideGap="md"
					slideSize="16rem"
					withControls
					align="start"
					dragFree
					className="border-l border-lightBorder"
				>
					{projects.map((project) => (
						<Carousel.Slide
							key={project.uid}
							className="flex border border-lightBorder rounded-normal pl-4 pr-2 py-2 group h-40 mx-2"
						>
							<div
								className="flex flex-row items-start gap-2"
								onClick={() => navigate(`/project/${project.uid}`)}
							>
								{project.type === ProjectType.standard ? (
									<IconBook2 size={20} />
								) : (
									<IconAtom size={20} />
								)}
								<div className="flex flex-col">
									<div className="text-sm font-bold">{project.title}</div>
									<TypographyStylesProvider>
										<div
											dangerouslySetInnerHTML={{ __html: project.description }}
											className="text-xs line-clamp-6 text-gray-500 w-44"
										/>
									</TypographyStylesProvider>
								</div>
								{currentUser.favouriteProjects.includes(project.uid) ? (
									<div className="ml-auto cursor-pointer flex transition-all ease-in-out duration-300">
										<IconHeartMinus
											size={16}
											onClick={(e) => {
												e.stopPropagation(), removeFavourite(project.uid);
											}}
											className="group-hover:block hidden pointer-events-auto"
										/>
										<TbHeartFilled
											size={16}
											onClick={(e) => {
												e.stopPropagation(), addFavourite(project.uid);
											}}
											className="group-hover:hidden block"
										/>
									</div>
								) : (
									<div className="ml-auto cursor-pointer hover:text-black invisible group-hover:visible transition-all ease-in-out duration-300">
										<IconHeartPlus
											size={16}
											onClick={(e) => {
												e.stopPropagation(), addFavourite(project.uid);
											}}
										/>
									</div>
								)}
							</div>
						</Carousel.Slide>
					))}
					<Progress
						value={scrollProgress}
						styles={{
							bar: { transitionDuration: "0ms" },
							root: { maxWidth: rem(320) },
						}}
						size="sm"
						mt="xl"
						mx="auto"
					/>
				</Carousel>
			</div>
		</div>
	);
};
