import Project from "../models/projectSchema";
import Chapter from "../models/chapterSchema";
import Branch from "../models/branchSchema";
import Version from "../models/versionSchema";

export const getProjectWordCount = async (req: any, res: any) => {
	const { projectId } = req.params;

	try {
		const project = await Project.findOne({ uid: projectId });
		const folders = project.folders;

		let wordCount = 0;

		let chapterIds = project.chapters;
		for (let i = 0; i < folders.length; i++) {
			const folder = folders[i];
			chapterIds = chapterIds.concat(folder.chapterIds);
		}

		const chapters = await Chapter.find({
			projectId,
			uid: { $in: chapterIds },
		});

		const chapterCount = chapters?.length || 0;
		wordCount =
			chapters?.reduce((acc, chapter) => {
				return (acc += chapter?.content?.wordCount || 0);
			}, 0) || 0;

		const branchCount = await Branch.countDocuments({ projectId });
		const versionCount = await Version.countDocuments({ projectId });
		const userCount = project.collaborators.length;

		let chapterWithMostWord;

		if (!chapters || chapters.length === 0) {
			return res.status(200).json({
				wordCount,
				chapterCount,
				branchCount,
				versionCount,
				userCount,
				chapterWithMostWords: "-",
			});
		}

		chapterWithMostWord = chapters.reduce((acc, chapter) => {
			if (chapter.content?.wordCount > acc.content?.wordCount) {
				return chapter;
			} else {
				return acc;
			}
		}, chapters[0]);

		const chapterWithMostWords =
			chapterWithMostWord.content?.title || chapterWithMostWord.title;

		res.status(200).json({
			wordCount,
			chapterCount,
			branchCount,
			versionCount,
			userCount,
			chapterWithMostWords,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
