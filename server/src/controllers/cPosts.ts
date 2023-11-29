import User, { notificationType } from "../models/user/userSchema";
import Posts from "../models/postSchema";
import { v4 as uuidv4 } from "uuid";
import { pusher } from "../../index";

export const getPosts = async (req: any, res: any) => {
	try {
		const posts = await Posts.find({})
			.sort({ dateCreated: -1 })
			.limit(24)
			.populate({
				path: "owner",
				select: "-password -aboutMe -roles -interests -bookmarks",
			})
			.select("-comments");
		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req: any, res: any) => {
	const userId = req.user._id;
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
		const post = await Posts.findOne({ uid: postId })
			.populate({
				path: "owner",
				select: "-password -aboutMe -roles -interests -bookmarks",
			})
			.populate({
				path: "comments.owner",
				select: "-password -aboutMe -roles -interests -bookmarks",
			});

		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getUserPosts = async (req: any, res: any) => {
	const userId = req.user._id;
	try {
		const posts = await Posts.find({ owner: userId })
			.sort({ dateCreated: -1 })
			.limit(25)
			.populate({
				path: "owner",
				select: "-password -aboutMe -roles -interests -bookmarks",
			});
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSingleUserPosts = async (req: any, res: any) => {
	const { userId } = req.params;

	try {
		const user = await User.findOne({ uid: userId });
		if (!user) {
			res.status(404).json({ message: "user not found" });
		}
		const posts = await Posts.find({ owner: user._id })
			.sort({ dateCreated: -1 })
			.limit(25)
			.populate({
				path: "owner",
				select: "-password -aboutMe -roles -interests -bookmarks",
			});
		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const postComment = async (req: any, res: any) => {
	const userId = req.user._id;
	const { postId } = req.params;
	const { comment } = req.body;
	// const pusher = initPusher();

	const uid = uuidv4();
	try {
		const post = await Posts.findOne({ uid: postId });
		const postOwner = await User.findById(post.owner);
		const user = await User.findById(userId);
		const newComment = {
			uid,
			owner: userId,
			content: comment,
			likes: 0,
			dateCreated: new Date(),
		};

		if (postOwner._id.toString() !== userId.toString()) {
			const notification = {
				notificationType: notificationType.postComment,
				notificationBody: `${user.name} has commented on your post: ${post.postTitle} `,
				notificationTitle: "You received a comment",
				notificationTime: new Date(),
				notificationRead: false,
				active: true,
				ctaId: postId,
			};

			postOwner.inbox.push(notification);

			pusher.trigger(`user-${postOwner._id}`, "notification", {
				notification,
				userId,
			});
			await postOwner.save();
		}

		post.comments.push(newComment);
		await post.save();

		pusher.trigger(`post-${postId}`, "comments", {
			comment,
			uid,
			postId,
		});

		res.status(200).json({ message: "comment posted", comment: newComment });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
