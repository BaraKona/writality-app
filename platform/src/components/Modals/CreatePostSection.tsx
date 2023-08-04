import {
	Button,
	Chip,
	Input,
	Modal,
	TextInput,
	useMantineTheme,
	Text,
	Textarea,
	Flex,
	Divider,
	ColorInput,
} from "@mantine/core";
import React, { FC } from "react";
import { IconDatabase } from "@tabler/icons-react";
import { inputStyles } from "../../styles/inputStyles";
import { IPost } from "../../interfaces/IPost";
import { BlueButton } from "../buttons/BlueButton";
export const CreatePostSection: FC<{
	createPost: (e: any) => void;
	setPost: React.Dispatch<React.SetStateAction<IPost>>;
	post: IPost;
}> = ({ createPost, setPost, post }) => {
	const genreChips = [
		{ value: "Fantasy", title: "Fantasy" },
		{ value: "Sci-Fi", title: "Sci-Fi" },
		{ value: "Romance", title: "Romance" },
		{ value: "Horror", title: "Horror" },
		{ value: "Mystery", title: "Mystery" },
		{ value: "Thriller", title: "Thriller" },
		{ value: "Drama", title: "Drama" },
		{ value: "Comedy", title: "Comedy" },
		{ value: "Action", title: "Action" },
		{ value: "Adventure", title: "Adventure" },
		{ value: "Crime", title: "Crime" },
		{ value: "Historical", title: "Historical" },
		{ value: "Western", title: "Western" },
		{ value: "Animation", title: "Animation" },
		{ value: "Biography", title: "Biography" },
		{ value: "Family", title: "Family" },
		{ value: "Musical", title: "Musical" },
		{ value: "Sport", title: "Sport" },
		{ value: "War", title: "War" },
		{ value: "Documentary", title: "Documentary" },
		{ value: "Grim-dark", title: "Grim-dark" },
		{ value: "Cyberpunk", title: "Cyberpunk" },
	];
	const typeChips = [
		{ value: "Short-Story", title: "Short-Story" },
		{ value: "Novel", title: "Novel" },
		{ value: "Poem", title: "Poem" },
		{ value: "Script", title: "Script" },
		{ value: "Manga / Comic", title: "Manga / Comic" },
		{ value: "Fan-Fiction", title: "Fan-Fiction" },
		{ value: "Web-Novel", title: "Web-Novel" },
		{ value: "Other", title: "Other" },
	];
	const collaborationChips = [
		{ value: "Collaboration", title: "Collaboration" },
		{ value: "Feedback", title: "Feedback" },
		{ value: "Critique", title: "Critique" },
		{ value: "Accountability", title: "Accountability" },
		{ value: "Other", title: "Other" },
	];
	return (
		<div className="overflow-y-auto basis-[26rem]">
			<div className="px-1 ">
				<div className="border-t-stone-800 font-normal text-xs">
					The best way to find people is to put yourself out there. Feel free to
					be as specific as possible. If you're looking for a specific skill or
					for a specific type of contribution, make sure to include it in your
					post.
				</div>
				<Divider my="xs" color="grey.0" />
				<form onSubmit={(e) => createPost(e)}>
					<div className="flex flex-wrap h-[calc(100vh-14rem)] overflow-y-auto">
						<TextInput
							label="Project Title"
							placeholder="Project Title"
							className="w-full"
							variant="default"
							styles={inputStyles}
							onChange={(e) =>
								setPost({ ...post, projectTitle: e.target.value })
							}
						/>
						<TextInput
							label="Post Title"
							placeholder="Post Title"
							required
							className="w-full"
							variant="default"
							styles={inputStyles}
							onChange={(e) => setPost({ ...post, postTitle: e.target.value })}
						/>

						<Textarea
							label="Description"
							placeholder="Describe your project so people know what you're working on."
							required
							className="w-full"
							styles={inputStyles}
							variant="default"
							maxRows={5}
							minRows={5}
							onChange={(e) =>
								setPost({ ...post, description: e.target.value })
							}
						/>
						<Textarea
							label="What are you looking for ?"
							placeholder="Briefly describe who and what you're looking for."
							required
							className="w-full"
							styles={inputStyles}
							variant="default"
							maxRows={5}
							minRows={5}
							onChange={(e) =>
								setPost({ ...post, collaboration: e.target.value })
							}
						/>
						<div className="w-full mt-4">
							<Text size="xs" weight={600}>
								Genre(s)
							</Text>
							<div className=" mx-auto">
								<Chip.Group
									multiple
									onChange={(value) => setPost({ ...post, genres: value })}
								>
									<Flex gap={5} wrap="wrap">
										{genreChips.map((chip) => (
											<Chip
												key={chip.value}
												value={chip.value}
												color="grape"
												variant="outline"
												radius="sm"
												size="xs"
											>
												{chip.title}
											</Chip>
										))}
									</Flex>
								</Chip.Group>
							</div>
						</div>
						<div className="w-full mt-4">
							<Text size="xs" weight={600}>
								Post Type (select one){" "}
							</Text>
							<div>
								<Chip.Group
									// @ts-ignore
									onChange={(value) => setPost({ ...post, postType: value })}
								>
									<Flex gap={5} wrap="wrap">
										{typeChips.map((chip) => (
											<Chip
												key={chip.value}
												value={chip.value}
												color="orange"
												variant="outline"
												radius="sm"
												size="xs"
											>
												{chip.title}
											</Chip>
										))}
									</Flex>
								</Chip.Group>
							</div>
						</div>
						<div className="w-full mt-4">
							<Text size="xs" weight={600}>
								Collaboration (select one)
							</Text>

							<Chip.Group
								// @ts-ignore
								onChange={(value) =>
									setPost({ ...post, collaborationType: value as string })
								}
							>
								<Flex gap={5} wrap="wrap">
									{collaborationChips.map((chip) => (
										<Chip
											key={chip.value}
											value={chip.value}
											color="violet"
											variant="outline"
											radius="sm"
											size="xs"
										>
											{chip.title}
										</Chip>
									))}
								</Flex>
							</Chip.Group>
						</div>
						<Divider my="xs" color="grey.0" />
						<div className="flex gap-2 flex-wrap">
							<div className="flex gap-2">
								<ColorInput
									label="Time Colour"
									styles={inputStyles}
									format="hexa"
									onChange={(value) =>
										setPost({
											...post,
											theme: { ...post.theme, time: value },
										})
									}
								/>
								<ColorInput
									label="Project title Colour"
									styles={inputStyles}
									format="hexa"
									onChange={(value) =>
										setPost({
											...post,
											theme: { ...post.theme, projectTitle: value },
										})
									}
								/>
							</div>
							<div className="flex gap-2">
								<ColorInput
									label="Post title Colour"
									styles={inputStyles}
									format="hexa"
									onChange={(value) =>
										setPost({
											...post,
											theme: { ...post.theme, postTitle: value },
										})
									}
								/>
								<ColorInput
									label="Text Colour"
									styles={inputStyles}
									format="hexa"
									onChange={(value) =>
										setPost({
											...post,
											theme: { ...post.theme, text: value },
										})
									}
								/>
							</div>
							<ColorInput
								className="w-full"
								label="Background Color"
								styles={inputStyles}
								format="hexa"
								onChange={(value) =>
									setPost({
										...post,
										theme: { ...post.theme, background: value },
									})
								}
							/>
						</div>
					</div>
					<div className="mt-5">
						<BlueButton>Create Post</BlueButton>
					</div>
				</form>
			</div>
		</div>
	);
};
