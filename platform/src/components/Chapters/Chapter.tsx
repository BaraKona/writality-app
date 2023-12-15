import { IChapter } from "../../interfaces/IChapter";
import { FC } from "react";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import { Text } from "@mantine/core";
import { IconFileText, IconGripVertical, IconTrash } from "@tabler/icons-react";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import { useDraggableContext } from "../DragAndDrop/DraggableProvider";

export const Chapter: FC<{
  chapter: IChapter;
  openChapter: () => void;
  openChapterModal: () => void;
  disabled: boolean;
  listenerId?: string;
}> = ({ chapter, openChapter, openChapterModal, disabled, listenerId }) => {
  const { Draggable } = useDraggableContext();

  const { attributes, listeners, setNodeRef, style } = Draggable({
    id: listenerId || "",
  });

  return (
    <div
      className="flex cursor-default items-center gap-3 rounded-md border-border bg-base px-2.5 hover:bg-coolGrey-1 dark:border-borderDark dark:bg-baseDark dark:hover:bg-hoverDark"
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      <div
        className=" group flex grow cursor-pointer place-items-start gap-1 py-1 text-coolGrey-7 dark:text-coolGrey-5"
        onClick={openChapter}
      >
        <IconFileText
          size={16}
          className="shrink-0 group-hover:text-black dark:hover:text-coolGrey-1 dark:group-hover:text-coolGrey-3"
        />
        <p className="max-w-[80ch] text-xs font-medium text-coolGrey-4 group-hover:text-coolGrey-7 dark:text-coolGrey-6 dark:group-hover:text-coolGrey-3">
          {chapter.content.title || chapter.title || "Untitled Chapter"}
        </p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Text color="dimmed" size="xs" className="shrink-0">
          {useTimeFromNow(chapter?.dateUpdated.date) ||
            useTimeFromNow(chapter?.dateCreated.date)}
        </Text>

        <IconTrash
          size={16}
          onClick={openChapterModal}
          className="shrink-0 cursor-pointer text-coolGrey-7 hover:text-red-900"
        />

        {listenerId && (
          <ButtonWrapper>
            <IconGripVertical
              size={14}
              {...listeners}
              className="shrink-0 cursor-pointer text-coolGrey-4"
            />
          </ButtonWrapper>
        )}
      </div>
    </div>
  );
};
