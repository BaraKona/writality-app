import { Divider } from "@mantine/core";
import { useToast } from "../../hooks";
import { CreatePostModal } from "../../components/Modals";
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
		<div className="place-items-center rounded-normal bg-white px-3 py-3">
			<PostHeader title="Posts" openModal={openPostCreation} />
			<div className="flex flex-row bg-white rounded-normal px-3 py-2 h-[calc(100vh-7rem)] overflow-y-auto">
				<div>
					<div className="flex flex-wrap gap-2">
						{posts?.map((post: IPost, index: number) => (
							<PostCard post={post!} openPost={openPost} key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
