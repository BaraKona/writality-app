import { FC, ReactNode } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useToast } from "../../hooks/useToast";
export const Authenticated: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    useToast(
      "error",
      "You are not logged in, you will be redirected to the login page. 😎"
    );
    router.push("/auth/login");
  }
  return <>{children}</>;
};
