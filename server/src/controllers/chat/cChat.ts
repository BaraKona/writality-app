import Chat from "../../models/chat/chapterSchema";

export const createChat = async (req: any, res: any) => {
  const { uid, projectId, comments } = req.body;
  const newChat = new Chat({ uid, projectId, comments });
  try {
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getProjectChat = async (req: any, res: any) => {
  const { projectId } = req.params;
  try {
    const chat = await Chat.findOne({
      projectId,
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentOnChat = async (req: any, res: any) => {
  const { projectId } = req.params;
  const { content, date, user, uid } = req.body;
  console.log(content, date, user, uid);
  try {
    const chat = await Chat.findOne({
      projectId,
    });
    chat.comments.push({ content, date, user, uid });

    console.log(chat);
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
