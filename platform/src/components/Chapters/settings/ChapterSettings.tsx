import { Divider, ScrollArea, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FC } from "react";
import { ButtonWrapper } from "../../buttons/ButtonWrapper";
import { inputStyles } from "../../../styles/inputStyles";
import { useThemeContext } from "../../../Providers/ThemeProvider";

export const ChapterSettings: FC<{ close: () => void }> = ({ close }) => {
  const { theme } = useThemeContext();
  return (
    <div className="min-w-auto w-72">
      <div className="my-2 flex items-center gap-2 px-2 text-xs font-medium text-coolGrey-7">
        Settings
        <ButtonWrapper className="ml-auto" onClick={close}>
          <IconX
            size={14}
            className="text-coolGrey-4 group-hover:text-black dark:text-coolGrey-6 dark:hover:text-coolGrey-1"
          />
        </ButtonWrapper>
      </div>
      <Divider className="!border-coolGrey-1 dark:!border-borderDark" />
      <ScrollArea.Autosize
        placeholder=""
        mah={400}
        offsetScrollbars
        scrollbarSize={6}
        className="px-2"
      >
        <TextInput
          label="Chapter Name"
          placeholder="Chapter Name"
          className="m-1"
          styles={inputStyles()}
        />
      </ScrollArea.Autosize>
    </div>
  );
};
