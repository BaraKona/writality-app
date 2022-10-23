import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../pages/api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function createAUserWithEmailAndPassword(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signInAUserWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signOutCurrentUser() {
    return auth.signOut();
  }

  useEffect(() => {
    let unsubscribe = null;
    async function fetchUser() {
      unsubscribe = await auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
    }
    fetchUser();
    // return unsubscribe;
  }, []);

  const sharedState = {
    createAUserWithEmailAndPassword,
    signInAUserWithEmailAndPassword,
    currentUser,
    signOutCurrentUser,
  };
  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}
