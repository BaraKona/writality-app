import { useNavigate } from "react-router-dom";
import { IProject, ProjectType } from "../../interfaces/IProject";
import { IconAtom2, IconBook2 } from "@tabler/icons-react";
import { SmallText } from "../texts/SmallText";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";

export const ListProjects = ({ projects }: { projects: IProject[] }) => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-1.5">
			{projects.map((project) => (
				<div
					className="gap-2 rounded-normal p-2 border border-border dark:border-borderDark hover:border-coolGrey-3 hover:shadow-sm dark:shadow-none dark:hover:border-coolGrey-5 cursor-pointer transition-all duration-200 ease-in-out"
					onClick={() => navigate(`/project/${project.uid}/home`)}
					key={project.uid}
				>
					<div className="flex justify-between items-center ">
						<div className="flex gap-2 items-center">
							{project.type === ProjectType.standard ? (
								<IconBook2
									size={20}
									className="text-neutral-600 dark:text-stone-500"
								/>
							) : (
								<IconAtom2 size={20} className="text-cyan-800" />
							)}
							<div className="text-sm font-semibold">{project.title}</div>
						</div>
						<SmallText light>
							{useTimeFromNow(
								project.dateUpdated?.date || project.dateCreated.date
							)}
						</SmallText>
					</div>
				</div>
			))}
		</div>
	);
};
