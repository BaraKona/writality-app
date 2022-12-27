import { FC, ReactNode } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
export const Authenticated: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    useToast(
      "error",
      "You are not logged in, you will be redirected to the login page. 😎"
    );
    navigate("/auth/login");
  }
  return <>{children}</>;
};
