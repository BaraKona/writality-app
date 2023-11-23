import { FC } from "react";
import { getPosts } from "../../api/posts";
import { useQuery } from "react-query";
import { IPost } from "../../interfaces/IPost";
import { PostCard } from "../../components/Posts/PostCard";
import { Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { DefaultPostBanner } from "../../assets/images";
import { BannerImage } from "../../components/BannerImage";
import { IconEdit, IconTemplate } from "@tabler/icons-react";
import { tooltipStyles } from "../../styles/tooltipStyles";
import { Title } from "../../components/Title";
import { Loading } from "../../components/Loading";

export const PostsPage: FC = () => {
	const { data: posts } = useQuery("posts", getPosts);
	const navigate = useNavigate();

	const openPost = (postId: string) => {
		navigate(`/posts/${postId}`);
	};
	const openPostCreation = () => {
		navigate(`/posts/create`);
	};

	if (!posts) return <Loading isLoading={true} />;

	return (
		<div className="overflow-y-auto rounded-lg bg-base dark:bg-baseDark">
			<Tooltip
				label="Create a new post"
				position="left"
				withArrow
				styles={tooltipStyles}
			>
				<button
					className="bg-base p-2 hover:bg-gray-100 rounded-lg fixed right-5 top-14 border border-border dark:border-borderDark dark:bg-baseDark dark:hover:bg-hoverDark"
					onClick={openPostCreation}
				>
					<IconEdit size={18} />
				</button>
			</Tooltip>
			<BannerImage image={DefaultPostBanner} alt="Post banner" />
			<div className="max-w-screen-xl mx-auto">
				<Title>
					<div className="flex gap-2">
						<IconTemplate size={40} className="dark:text-purple-600" />
						Users
					</div>
				</Title>

				<div className="flex gap-2 flex-wrap">
					{posts?.map((post: IPost) => (
						<PostCard post={post} openPost={openPost} key={post?.uid} />
					))}
				</div>
			</div>
		</div>
	);
};
