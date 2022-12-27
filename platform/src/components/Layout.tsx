import React, { FC, ReactNode } from "react";
import { Sidebar } from "./Navigation";
export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const isDashboard = window.location.pathname.includes("dashboard");
  console.log(isDashboard);
  if (isDashboard) {
    return <Sidebar>{children}</Sidebar>;
  }
  return <div className="">{children}</div>;
};
