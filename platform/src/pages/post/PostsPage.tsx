import { FC, useState } from "react";
import { getPosts, createPost } from "../../api/posts";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { IPost } from "../../interfaces/IPost";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCreatePost } from "../../hooks/useCreatePost";
import { PostCard } from "../../components/Posts/PostCard";
import { PostHeader } from "../../components/Posts/PostHeader";
import { Text } from "@mantine/core";
import { CategoryListItem } from "../../components/ListItems";
import { circle1 } from "../../assets/icons";
import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const PostsPage: FC = () => {
	const [createProjectModal, setCreateProjectModal] = useState(false);
	const queryClient = useQueryClient();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [collaboration, setCollaboration] = useState("");
	const [genres, setGenres] = useState<string[]>([]);
	const [postType, setPostType] = useState<string>("");
	const [collaborationType, setCollaborationType] = useState<string>("");
	const [projectTitle, setProjectTitle] = useState<string>("");

	const { data: posts } = useQuery("posts", getPosts);
	const navigate = useNavigate();

	const openPost = (postId: string) => {
		navigate(`/posts/${postId}`);
	};
	const openPostCreation = () => {
		navigate(`/posts/create`);
	};
	return (
		<div className="place-items-center rounded-normal bg-base border border-border px-3 py-3">
			<PostHeader title="Posts" openModal={openPostCreation} />
			<div className="bg-base rounded-normal  py-2 h-[calc(100vh-6.4rem)]">
				<div className="mx-auto bg-base px-2 border border-border rounded-normal h-[calc(100vh-6.9rem)] overflow-y-auto py-3 flex flex-col gap-2">
					{posts?.map((post: IPost) => (
						<PostCard post={post!} openPost={openPost} />
					))}
				</div>
			</div>
		</div>
	);
};
