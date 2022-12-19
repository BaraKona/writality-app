import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleAuthProvider, db } from "../api/firebase";
import { router } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { registerUser } from "../api/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getAllUsers } from "./database/Users";
const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  function createAUserWithEmailAndPassword(email, password, name) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        setCurrentUser(
          await registerUser({ uid: auth.currentUser.uid, name, email }).then(
            () => {
              // push route to dashboard
              router.push("/dashboard");
            }
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function signInAUserWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signOutCurrentUser() {
    return auth.signOut();
  }
  async function getUsers() {
    setUsers(await getAllUsers());
  }
  async function signInWithGoogle() {
    await signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
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
    getUsers,
    users,
    setCurrentUser,
  };
  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}
