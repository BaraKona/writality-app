import { FC } from "react";
import { VscInfo } from "react-icons/vsc";
import { Timeline, Text, ScrollArea } from "@mantine/core";
import { useTimeFromNow } from "../../hooks/useTimeFromNow";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
  IconFilePlus,
} from "@tabler/icons";
type chapterHistoryType = {
  user: string;
  date: string;
  action: string;
}[];
export const ChapterHistory: FC<{ history: chapterHistoryType }> = ({
  history,
}) => {
  if (!history) {
    return null;
  }
  const active = history.length <= 1 ? history.length : history.length - 2;
  return (
    <div className="min-w-auto max-w-md mt-auto">
      <div className=" border border-baseLight  hover:bg-base p-5">
        <h3 className="text-lg flex font-bold gap-2 mb-2">
          History <VscInfo size={14} className="cursor-pointer my-auto" />
        </h3>
        <ScrollArea.Autosize maxHeight={192} offsetScrollbars scrollbarSize={6}>
          <Timeline active={active} bulletSize={24} lineWidth={2}>
            {history?.reverse().map((item, index) => (
              <Timeline.Item
                key={index}
                bullet={
                  item.action == "created" ? (
                    <IconFilePlus size={12} />
                  ) : (
                    <IconGitCommit size={12} />
                  )
                }
                title={`Chapter ${item.action}`}
              >
                <Text color="dimmed" size="sm">
                  Chapter was {item.action} by{" "}
                  <Text variant="link" component="span" inherit>
                    {item.user.substring(0, 5)}
                  </Text>
                </Text>
                <Text size="xs" mt={4}>
                  {useTimeFromNow(item.date)}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </ScrollArea.Autosize>
      </div>
    </div>
  );
};
