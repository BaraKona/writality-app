import { Affix, Button, Grid } from "@mantine/core";
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
  const [subtitle, setSubtitle] = useState<string>("");

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
          subtitle
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
    <div className="w-full p-4 h-screen bg-base overflow-y-auto">
      <CreatePostModal
        opened={createProjectModal}
        setOpened={setCreateProjectModal}
        createPost={postCreate}
        setTitle={setTitle}
        setDescription={setDescription}
        setGenres={setGenres}
        setPostType={setPostType}
        setCollaborationType={setCollaborationType}
        setSubtitle={setSubtitle}
        setCollaboration={setCollaboration}
      />
      <h2 className="text-4xl font-bold ">All Projects</h2>
      <Loading isLoading={isLoading}>
        <Grid gutter="md">
          {posts?.map((post: IPost) => (
            <Grid.Col span={3}>
              <PostCard post={post!} />
            </Grid.Col>
          ))}
        </Grid>
      </Loading>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          color="grape"
          variant="light"
          leftIcon={<IconPencilPlus />}
          onClick={() => setCreateProjectModal(true)}
        >
          Create Post
        </Button>
      </Affix>
    </div>
  );
};
