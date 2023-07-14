import { Divider } from "@mantine/core";
import { useToast } from "../hooks";
import { CreatePostModal } from "../components/Modals";
import { FC, useState } from "react";
import { getPosts, createPost } from "../api/posts";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { IPost } from "../interfaces/IPost";
import { useAuthContext } from "../contexts/AuthContext";
import { useCreatePost } from "../hooks/useCreatePost";
import { PostCard } from "../components/Posts/PostCard";
import { PostHeader } from "../components/Posts/PostHeader";
import { Text } from "@mantine/core";
import { CategoryListItem } from "../components/ListItems";
import { circle1 } from "../assets/icons";
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
		<>
			<PostHeader title="Posts" openModal={() => setCreateProjectModal(true)} />
			<div className="flex flex-row bg-white rounded-normal">
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
					<div className="bg-white px-4 pt-4 overflow-y-auto flex flex-col h-[calc(100vh-121px)] border-r border-r-lightBorder">
						<div className="grid grid-cols-1 gap-4">
							{posts?.map((post: IPost) => (
								<PostCard post={post!} />
							))}
						</div>
					</div>
				</div>
				<section>
					<Divider className="border-lightBorder" orientation="vertical" />
					<div className=" p-4 text-blueText ">
						<div className="bg-[#f2f2f2] rounded-normal px-4 pt-4 pb-10 flex gap-4 items-center relative">
							<div className="w-72">
								<p className="text-md font-semibold leading-tight mb-1">
									{" "}
									Posts are a great way to interact with people
								</p>
								<Text color="dimmed" size="sm">
									Attract more people to your project by creating a post
								</Text>
							</div>
							<Image src={circle1} alt="circle" height={120} width={120} />
							<button
								className="mt-4 text-xs absolute bottom-0 left-0 hover:bg-[#f2f2f2] px-6 bg-white font-semibold hover:text-black rounded-tr-md rounded-bl-md py-3 transition-all duration-200 ease-in-out"
								onClick={() => setCreateProjectModal(true)}
							>
								Post
							</button>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};
