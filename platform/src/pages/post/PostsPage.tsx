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
import { IconEdit, IconTemplate } from "@tabler/icons-react";
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
		<div className="place-items-center rounded-normal relative overflow-y-auto">
			<Tooltip
				label="Create a new post"
				position="left"
				withArrow
				styles={tooltipStyles}
			>
				<button
					className="bg-base p-2 hover:bg-gray-100 rounded-normal fixed right-5 top-14 border border-border dark:border-borderDark dark:bg-baseDark dark:hover:bg-hoverDark"
					onClick={openPostCreation}
				>
					<IconEdit size={18} />
				</button>
			</Tooltip>
			<BannerImage image={DefaultPostBanner} alt="Post banner" />
			<div className="">
				<div className="max-w-screen-lg mx-auto">
					<div className="bg-base dark:bg-baseDark rounded-normal">
						<div className="flex gap-4 items-center">
							<IconTemplate size={40} className="dark:text-purple-600" />
							<Title>Posts</Title>
						</div>
						<div className="mx-auto bg-base dark:bg-baseDark rounded-normal flex flex-wrap gap-2">
							{posts?.map((post: IPost) => (
								<PostCard post={post!} openPost={openPost} key={post.uid} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
