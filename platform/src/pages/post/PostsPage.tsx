import { FC, useState } from "react";
import { getPosts, createPost } from "../../api/posts";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { IPost } from "../../interfaces/IPost";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCreatePost } from "../../hooks/useCreatePost";
import { PostCard } from "../../components/Posts/PostCard";
import { Text, Tooltip } from "@mantine/core";
import { CategoryListItem } from "../../components/ListItems";
import { circle1 } from "../../assets/icons";
import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { DefaultPostBanner } from "../../assets/images";
import { BannerImage } from "../../components/BannerImage";
import { IconEdit } from "@tabler/icons-react";
import { CreateButton } from "../../components/buttons/CreateChapterButton";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { Title } from "../../components/Title";

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
		<div className="place-items-center rounded-normal relative">
			<Tooltip
				label="Create a new post"
				position="left"
				withArrow
				styles={tooltipStyles}
			>
				<button
					className="bg-base p-2 hover:bg-gray-100 rounded-normal absolute right-2 top-2"
					onClick={openPostCreation}
				>
					<IconEdit size={18} />
				</button>
			</Tooltip>
			<BannerImage image={DefaultPostBanner} alt="Post banner" />
			<div className="h-[calc(100vh-16rem)] overflow-y-auto">
				<div className="max-w-screen-md mx-auto">
					<div className="bg-base rounded-normal">
						<Title>Posts</Title>
						<div className="mx-auto bg-base rounded-normal flex flex-wrap gap-2">
							{posts?.map((post: IPost) => (
								<PostCard post={post!} openPost={openPost} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
