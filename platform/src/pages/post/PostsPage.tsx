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

	const { data: posts } = useQuery("posts", getPosts);

	const createAPost = useMutation(
		() =>
			createPost({
				title,
				description,
				genres,
				postType,
				collaborationType,
				collaboration,
				projectTitle,
				postTitle: title,
			}),
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
		<div className=" w-[calc(100vw-14rem)] place-items-center rounded-normal bg-white px-3 py-2">
			<PostHeader title="Posts" openModal={() => setCreateProjectModal(true)} />
			<div className="flex flex-row bg-white rounded-normal px-3 py-2 h-[calc(100vh-7rem)] overflow-y-auto">
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
					<div className="flex flex-wrap gap-2">
						{posts?.map((post: IPost) => (
							<PostCard post={post!} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
