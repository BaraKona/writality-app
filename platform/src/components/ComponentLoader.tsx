import { useAuthContext } from "../contexts/AuthContext";
import { useState, useEffect, ReactNode, FC } from "react";
import { getUser } from "../api/user";
import { auth } from "../api/firebase";
import { Loading } from "./Loading";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const ComponentLoader: FC<{ children: ReactNode }> = ({ children }) => {
  const { setCurrentUser, currentUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unsubscribe = null;
    async function fetchUser() {
      unsubscribe = await auth.onAuthStateChanged(async (user: any) => {
        if (user) {
          setCurrentUser(await getUser(user.uid));
        } else {
          setCurrentUser(undefined);
        }
        setLoading(false);
      });
    }
    fetchUser();
    unsubscribe;
  }, []);
  return <Loading isLoading={loading}>{children}</Loading>;
};
