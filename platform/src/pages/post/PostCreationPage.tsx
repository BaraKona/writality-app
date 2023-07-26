import { FC, useState } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { IconArticle, IconTemplate, IconHome } from "@tabler/icons";
import { CreatePostSection } from "../../components/Modals/CreatePostSection";
import { Divider } from "@mantine/core";
import { PostBody } from "../../components/Posts/PostBody";
import { IPost } from "../../interfaces/IPost";
import { useCreatePost } from "../../hooks/posts/useCreatePost";
export const PostCreationPage: FC<{}> = () => {
	const [post, setPost] = useState<IPost>({
		uid: "",
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
		<div className="h-[calc(100vh-2.7rem)] place-items-center rounded-normal bg-white px-3 py-3">
			<Breadcrumbs items={breadcrumbs} />
			<Divider className="my-2 border-gray-200" />
			<div className="flex gap-3">
				<PostBody post={post} />
				<Divider className=" border-gray-200" orientation="vertical" />
				<CreatePostSection
					createPost={createPost}
					setPost={setPost}
					post={post}
				/>
			</div>
		</div>
	);
};
