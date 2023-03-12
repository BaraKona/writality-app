import { Affix, Button, Grid, Flex } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import { useToast } from "../../hooks";
import { CreatePostModal } from "../../components/Modals";
import { FC, useState } from "react";
import { getPosts, createPost } from "../../api/posts";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { IPost } from "../../interfaces/IPost";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCreatePost } from "../../hooks/useCreatePost";
import { Loading } from "../../components/Loading";
import { PostCard } from "../../components/Posts/PostCard";
import { PostHeader } from "../../components/Posts/PostHeader";
export const PostsPage: FC = () => {
	const [createProjectModal, setCreateProjectModal] = useState(false);
	const { currentUser } = useAuthContext();
	const queryClient = useQueryClient();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [collaboration, setCollaboration] = useState("");
	const [genres, setGenres] = useState<string[]>([]);
	const [postType, setPostType] = useState<string>("");
	const [collaborationType, setCollaborationType] = useState<string>("");
	const [projectTitle, setProjectTitle] = useState<string>("");

	const { data: posts, isLoading } = useQuery("posts", getPosts);

	const createAPost = useMutation(
		() =>
			createPost(
				useCreatePost(
					currentUser.uid,
					title,
					description,
					genres,
					postType,
					collaborationType,
					collaboration,
					projectTitle
				)
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("posts");
				setCreateProjectModal(false);
			},
		}
	);
	const postCreate = (e: any) => {
		e.preventDefault();
		if (genres.length === 0) {
			useToast("error", "Please select at least one genre");
			return;
		}
		if (postType === "") {
			useToast("error", "Please select a post type");
			return;
		}
		if (collaborationType === "") {
			useToast("error", "Please select a collaboration type");
			return;
		}
		createAPost.mutate();
	};
	return (
		<PostHeader
			title="Post Board"
			openModal={() => setCreateProjectModal(true)}
		>
			<CreatePostModal
				opened={createProjectModal}
				setOpened={setCreateProjectModal}
				createPost={postCreate}
				setTitle={setTitle}
				setDescription={setDescription}
				setGenres={setGenres}
				setPostType={setPostType}
				setCollaborationType={setCollaborationType}
				setProjectTitle={setProjectTitle}
				setCollaboration={setCollaboration}
			/>
			<Loading isLoading={isLoading}>
				<Flex
					direction={{ base: "column", sm: "row" }}
					gap={{ base: "sm", sm: "lg" }}
					justify={{ sm: "center" }}
					wrap="wrap"
					className="pb-5"
				>
					{posts?.map((post: IPost) => (
						<PostCard post={post!} />
					))}
				</Flex>
			</Loading>
		</PostHeader>
	);
};
