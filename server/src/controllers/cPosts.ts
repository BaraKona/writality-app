import Posts from "../models/postSchema";

export const getPosts = async (req: any, res: any) => {
	try {
		const posts = await Posts.find({
			limit: 25,
			sort: { dateCreated: -1 },
		});
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req: any, res: any) => {
	const {
		owner,
		postTitle,
		projectTitle,
		description,
		genres,
		postType,
		likes,
		dateCreated,
		comments,
		collaborationType,
		collaboration,
	} = req.body;
	const newPost = new Posts({
		owner,
		postTitle,
		projectTitle,
		description,
		genres,
		postType,
		likes,
		dateCreated,
		comments,
		collaborationType,
		collaboration,
	});
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({
			message: "Something went wrong, we could not get create your post",
		});
	}
};
