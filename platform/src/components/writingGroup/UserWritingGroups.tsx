import { SmallText } from "../texts/SmallText";
import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const UserWritingGroups: FC<{}> = () => {
  const [parent] = useAutoAnimate();
  return (
    <section className="grow" ref={parent}>
      <SmallText className="text-center" light>
        Writing Groups (coming soon).
      </SmallText>
    </section>
  );
};
