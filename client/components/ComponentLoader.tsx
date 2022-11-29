import { useAuthContext } from "../contexts/AuthContext";
import { useState, useEffect, ReactNode, FC } from "react";
import { getSingleUserById } from "../contexts/database/Users";
import { auth } from "../api/firebase";
import { Loading } from "./Loading";

export const ComponentLoader: FC<{ children: ReactNode }> = ({ children }) => {
  const { setCurrentUser, currentUser, getUsers } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;
    async function fetchUser() {
      unsubscribe = await auth.onAuthStateChanged(async (user: any) => {
        setCurrentUser(await getSingleUserById(user.uid));
        await getUsers();
        setLoading(false);
      });
    }
    fetchUser();
    unsubscribe;
  }, []);
  return <Loading isLoading={loading}>{children}</Loading>;
};
