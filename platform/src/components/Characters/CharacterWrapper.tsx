import { FC, ReactNode } from "react";

export const CharacterWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex-grow border-l bg-baseMid border-baseBorder px-3 hover:bg-base">
      <div className="border-b border-baseBorder">
        <h3 className="text-center font-semibold">Characters</h3>
      </div>
    </div>
  );
};
