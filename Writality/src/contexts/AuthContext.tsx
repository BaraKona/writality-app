import { createContext, useContext, useState, ReactNode } from "react";
import { auth, googleAuthProvider, db } from "../api/firebase";
import { registerUser } from "../api/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

type AuthContextType = {
  createAUserWithEmailAndPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signInAUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<any>;
  currentUser: any;
  signOutCurrentUser: () => Promise<void>;
  signInWithGoogle: () => Promise<any>;
  users: any;
  setCurrentUser: any;
};
const authContextDefaultValues: AuthContextType = {
  createAUserWithEmailAndPassword: () => Promise.resolve(),
  signInAUserWithEmailAndPassword: () => Promise.resolve(),
  currentUser: null,
  signOutCurrentUser: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  users: [],
  setCurrentUser: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextWrapper({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState("hh");
  const [users, setUsers] = useState([]);
  function createAUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string
  ) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        setCurrentUser(
          //@ts-ignore
          await registerUser({ uid: auth.currentUser.uid, name, email })
        );
        console.log("hi");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function signInAUserWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signOutCurrentUser() {
    return auth.signOut();
  }

  async function signInWithGoogle() {
    await signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
        return true;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        return false;
      });
  }

  const sharedState = {
    createAUserWithEmailAndPassword,
    signInAUserWithEmailAndPassword,
    currentUser,
    signOutCurrentUser,
    signInWithGoogle,
    users,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}
