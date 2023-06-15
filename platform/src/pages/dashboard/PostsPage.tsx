import {
	Affix,
	Button,
	Container,
	Divider,
	Flex,
	SimpleGrid,
} from "@mantine/core";
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
			<PostHeader title="Posts" openModal={() => setCreateProjectModal(true)} />
			<div className="flex flex-row bg-white">
				<div>
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
						<div className="bg-white pl-4 pt-4 overflow-y-auto flex flex-col rounded-tl-md h-[calc(100vh-110px)] border-r border-r-gray-200">
							<div className="grid grid-cols-1 gap-4">
								{posts?.map((post: IPost) => (
									<PostCard post={post!} />
								))}
							</div>
						</div>
					</Loading>
				</div>
				<div className=" ">
					<Divider className="border-gray-200 " orientation="vertical" />
					<p>ihoihioh</p>
				</div>
			</div>
		</BaseProjectView>
	);
};
