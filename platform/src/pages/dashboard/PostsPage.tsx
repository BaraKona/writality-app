import { Affix, Button, Container, Flex, SimpleGrid } from "@mantine/core";
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
import { BaseProjectView } from "../../components/Project";

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
		<BaseProjectView
			openModal={() => setCreateProjectModal(true)}
			projectId="posts"
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
				{/* <Container size={1600}> */}
				<SimpleGrid
					className="p-4 h-[calc(100vh-50px)] overflow-y-auto"
					bg={"white"}
					cols={4}
					spacing="lg"
					breakpoints={[
						{ maxWidth: "90rem", cols: 3, spacing: "xs" },
						{ maxWidth: "72rem", cols: 2, spacing: "xs" },
						{ maxWidth: "54rem", cols: 1, spacing: "xs" },
					]}
				>
					{posts?.map((post: IPost) => (
						<PostCard post={post!} />
					))}
				</SimpleGrid>
				{/* </Container> */}
			</Loading>
		</BaseProjectView>
	);
};
