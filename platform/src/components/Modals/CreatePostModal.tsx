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
} from "@mantine/core";
import React, { FC } from "react";
import { IconDatabase } from "@tabler/icons";
export const CreatePostModal: FC<{
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	createPost: (e: any) => void;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setGenres: React.Dispatch<React.SetStateAction<string[]>>;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
	setCollaborationType: React.Dispatch<React.SetStateAction<string>>;
	setPostType: React.Dispatch<React.SetStateAction<string>>;
	setProjectTitle: React.Dispatch<React.SetStateAction<string>>;
	setCollaboration: React.Dispatch<React.SetStateAction<string>>;
}> = ({
	opened,
	setOpened,
	createPost,
	setCollaborationType,
	setDescription,
	setGenres,
	setPostType,
	setProjectTitle,
	setTitle,
	setCollaboration,
}) => {
	const theme = useMantineTheme();

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
		<>
			<Modal
				size="xl"
				opened={opened}
				overlayProps={{
					color:
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2],
					opacity: 0.55,
					blur: 3,
				}}
				styles={{
					content: {
						background: theme.colorScheme === "dark" ? "#191a23" : "#fff",
						border: "1px solid #363130",
					},
					header: {
						background: theme.colorScheme === "dark" ? "#191a23" : "#fff",
						borderBottom: "1px solid #363130",
					},
				}}
				scrollAreaComponent={Modal.NativeScrollArea}
				onClose={() => setOpened(false)}
				title="Woah! Are you ready to Collaborate? 😃"
			>
				<div className="px-5 mt-2">
					<h3 className="border-t-stone-800 text-md ">
						<span className="text-purple-200 font-bold">
							What are you looking for ?
						</span>{" "}
						The best way to find people is to put yourself out there. Feel free
						to be as specific as possible. If you're looking for a specific
						skill or for a specific type of contribution, make sure to include
						it in your post.
					</h3>
					<form onSubmit={(e) => createPost(e)}>
						<div className="flex flex-wrap">
							<div className="w-full md:w-1/2">
								<TextInput
									label="Post Title"
									placeholder="Post Title"
									required
									className="mt-3 "
									variant="default"
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div className="w-full md:w-1/2">
								<TextInput
									label="Project Title"
									placeholder="Project Title"
									className="mt-3 "
									variant="default"
									onChange={(e) => setProjectTitle(e.target.value)}
								/>
							</div>
							<div className="w-full mt-4">
								<Textarea
									label="Description"
									placeholder="Description"
									required
									className="mt-3 "
									variant="default"
									maxRows={5}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className="w-full mt-4">
								<Textarea
									label="What are you looking for ?"
									placeholder="Briefly describe what you're looking for."
									required
									className="mt-3 "
									variant="default"
									maxRows={5}
									onChange={(e) => setCollaboration(e.target.value)}
								/>
							</div>
							<div className="w-full mt-4">
								<Text> Genre(s)</Text>
								<div className=" mx-auto">
									<Chip.Group multiple onChange={(value) => setGenres(value)}>
										<Flex gap={5} wrap="wrap">
											{genreChips.map((chip) => (
												<Chip
													key={chip.value}
													value={chip.value}
													color="grape"
													variant="outline"
													radius="sm"
												>
													{chip.title}
												</Chip>
											))}
										</Flex>
									</Chip.Group>
								</div>
							</div>
							<div className="w-full mt-4">
								<Text> Post Type (select one) </Text>
								<div>
									<Chip.Group
										// @ts-ignore
										onChange={(value) => setPostType(value)}
									>
										<Flex gap={5} wrap="wrap">
											{typeChips.map((chip) => (
												<Chip
													key={chip.value}
													value={chip.value}
													color="orange"
													variant="outline"
													radius="sm"
												>
													{chip.title}
												</Chip>
											))}
										</Flex>
									</Chip.Group>
								</div>
							</div>
							<div className="w-full mt-4">
								<Text> Collaboration (select one) </Text>

								<Chip.Group
									// @ts-ignore
									onChange={(value) => setCollaborationType(value)}
								>
									<Flex gap={5} wrap="wrap">
										{collaborationChips.map((chip) => (
											<Chip
												key={chip.value}
												value={chip.value}
												color="violet"
												variant="outline"
												radius="sm"
											>
												{chip.title}
											</Chip>
										))}
									</Flex>
								</Chip.Group>
							</div>
						</div>
						<div className="mt-5">
							<Button
								type="submit"
								variant="light"
								color="grape"
								leftIcon={<IconDatabase size={14} />}
							>
								Create Post
							</Button>
							<Button color="gray" onClick={() => setOpened(false)}>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};
