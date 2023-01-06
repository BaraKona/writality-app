import { TextInput, Button, Input, Textarea } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import React, { FC } from "react";
import { IChat } from "../../interfaces/IChat";
import { Comment } from "./Comment";
import { ScrollArea } from "@mantine/core";
export const CollaborationChat: FC<{
  setComment: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
  comments: IChat["comments"];
  commentViewportRef: React.RefObject<HTMLDivElement>;
  sendComment: () => void;
}> = ({ setComment, comment, comments, sendComment, commentViewportRef }) => {
  return (
    <div className="flex-grow  px-3  mx-auto max-w-3xl">
      <div className="border-b border-baseBorder">
        <h3 className="text-center font-semibold shadow-lg">Chat</h3>
      </div>
      <ScrollArea
        className="h-[calc(100vh - 300px)]"
        scrollbarSize={6}
        style={{ height: "calc(100vh - 300px)" }}
        viewportRef={commentViewportRef}
        // className="flex flex-col h-[calc(100%-40px)]"
      >
        <div className="flex-grow overflow-y-auto pr-3">
          <div className="flex flex-col gap-2">
            {comments?.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="flex gap-2 place-items-center mt-3">
        <Textarea
          placeholder="Your comment"
          // label="Your comment"
          // description="Hint: Keep the comments short and to the point to help others understand and make it a place you can come back to."
          className="flex-grow"
          variant="default"
          size="sm"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <Button
          variant="default"
          className="text-purple-400 hover:bg-purple-200  hover:text-purple-800"
          leftIcon={<IconSend size={14} />}
          onClick={sendComment}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
