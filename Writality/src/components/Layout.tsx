import React, { FC, ReactNode } from "react";
import { Sidebar } from "./Navigation";
import { useRouter } from "next/router";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const isDashboard = pathname.includes("dashboard");

  if (isDashboard) {
    return <Sidebar>{children}</Sidebar>;
  }
  return <div className="">{children}</div>;
};
