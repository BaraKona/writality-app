import { FC, useState } from "react";
import { IconArticle, IconClipboard } from "@tabler/icons-react";
import { CreatePostSection } from "../../components/Posts/CreatePostSection";
import { PostBody } from "../../components/Posts/PostBody";
import { IPost } from "../../interfaces/IPost";
import { useCreatePost } from "../../hooks/posts/useCreatePost";
export const PostCreationPage: FC<{}> = () => {
  const [post, setPost] = useState<IPost>({
    uid: "",
    /** @ts-ignore */
    owner: "",
    postTitle: "",
    projectTitle: "",
    description: "",
    collaborationType: "",
    collaboration: "",
    genres: [],
    postType: "",
    likes: [],
    dateCreated: new Date(),
    dateUpdated: new Date(),
    theme: {
      background: "",
      postTitle: "",
      projectTitle: "",
      text: "",
      time: "",
    },
  });
  const { mutate } = useCreatePost();

  const createPost = (e: any) => {
    e.preventDefault();
    mutate(post);
  };
  const breadcrumbs = [
    {
      label: "Posts",
      path: "/posts",
      icon: <IconClipboard size={18} />,
      isLoading: false,
    },
    {
      label: "Create",
      path: "/posts/create",
      icon: <IconArticle size={18} />,
      isLoading: false,
    },
  ];

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] gap-2 rounded-lg py-3">
      <PostBody post={post} addFavourite={() => {}} isCreate />
      <CreatePostSection
        createPost={createPost}
        setPost={setPost}
        post={post}
      />
    </div>
  );
};
