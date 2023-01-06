import { useAuthContext } from "./contexts/AuthContext";
import { useState, useEffect, ReactNode, FC } from "react";
import { getUser } from "./api/user";
import { auth } from "./api/firebase";
import { Loading } from "./components/Loading";

export const UserLoader: FC<{ children: ReactNode }> = ({ children }) => {
  const { setCurrentUser, currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let unsubscribe = null;
    async function fetchUser() {
      unsubscribe = await auth.onAuthStateChanged(async (user: any) => {
        if (user) {
          setCurrentUser(await getUser(user.uid));
        } else {
          setCurrentUser(undefined);
        }
        setIsLoading(false);
      });
    }
    fetchUser();
    unsubscribe;
  }, []);
  return <Loading isLoading={isLoading}>{children}</Loading>;
};
