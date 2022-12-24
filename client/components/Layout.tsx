import React, { FC, ReactNode } from "react";
import { Sidebar } from "./Navigation";
export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Sidebar>{children}</Sidebar>;
};
