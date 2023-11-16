import { FC, useState } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { IconArticle, IconTemplate } from "@tabler/icons-react";
import { CreatePostSection } from "../../components/Posts/CreatePostSection";
import { Divider } from "@mantine/core";
import { PostBody } from "../../components/Posts/PostBody";
import { IPost } from "../../interfaces/IPost";
import { useCreatePost } from "../../hooks/posts/useCreatePost";
export const PostCreationPage: FC<{}> = () => {
	const [post, setPost] = useState<IPost>({
		uid: "",
		/** @ts-ignore */
		owner: "",
		postTitle: "",
		projectTitle: "",
		description: "",
		collaborationType: "",
		collaboration: "",
		genres: [],
		postType: "",
		likes: [],
		dateCreated: new Date(),
		dateUpdated: new Date(),
		theme: {
			background: "",
			postTitle: "",
			projectTitle: "",
			text: "",
			time: "",
		},
	});
	const { mutate } = useCreatePost();

	const createPost = (e: any) => {
		e.preventDefault();
		mutate(post);
	};
	const breadcrumbs = [
		{
			label: "Posts",
			path: "/posts",
			icon: <IconTemplate size={18} />,
			isLoading: false,
		},
		{
			label: "Create",
			path: "/posts/create",
			icon: <IconArticle size={18} />,
			isLoading: false,
		},
	];

	return (
		<div className="h-[calc(100dvh-2.7rem)] place-items-center rounded-lg bg-base px-3 py-3">
			<Breadcrumbs items={breadcrumbs} />
			<Divider my="xs" className="!border-coolGrey-1 dark:!border-borderDark" />
			<div className="flex gap-3">
				<PostBody post={post} addFavourite={() => {}} />
				<Divider
					className=" border-border dark:border-borderDark"
					orientation="vertical"
				/>
				<CreatePostSection
					createPost={createPost}
					setPost={setPost}
					post={post}
				/>
			</div>
		</div>
	);
};
