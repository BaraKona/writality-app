import Posts from "../models/postSchema";
import { v4 as uuidv4 } from "uuid";
export const getPosts = async (req: any, res: any) => {
	try {
		const posts = await Posts.find({
			limit: 25,
		});
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req: any, res: any) => {
	const userId = req.user.uid;
	const {
		postTitle,
		projectTitle,
		description,
		genres,
		postType,
		collaborationType,
		collaboration,
		theme,
	} = req.body;
	const newPost = new Posts({
		owner: userId,
		postTitle,
		projectTitle,
		description,
		genres,
		postType,
		likes: [],
		dateCreated: new Date(),
		comments: [],
		collaborationType,
		collaboration,
		dateUpdated: new Date(),
		uid: uuidv4(),
		theme,
	});
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		console.log(error);
		res.status(409).json({
			message: "Something went wrong, we could not get create your post",
		});
	}
};

export const useSinglePost = async (req: any, res: any) => {
	const { postId } = req.params;
	try {
		const post = await Posts.findOne({ uid: postId });
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getUserPosts = async (req: any, res: any) => {
	const userId = req.user.uid;
	try {
		const posts = await Posts.find({ owner: userId });
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
