import { useQuery } from "react-query";
import { getAllChapterVersions } from "../../api/project/versions";

export default function useChapterVersions(chapterId: string) {
	return useQuery(["chapter", "versions", chapterId], () =>
		getAllChapterVersions(chapterId)
	);
}
