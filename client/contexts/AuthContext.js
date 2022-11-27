import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleAuthProvider, db } from "../api/firebase";
import { v4 as uuidv4 } from "uuid";
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
  const [loading, setLoading] = useState(true);

  function createAUserWithEmailAndPassword(email, password, name) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await addNewUser(auth.currentUser.uid, name, email);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function addNewUser(id, name, email) {
    const docId = id;
    const newUser = doc(db, `users/${docId}`);
    const data = {
      uid: docId,
      displayName: name,
      email,
      createdAt: serverTimestamp(),
    };
    await setDoc(newUser, data)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  async function getSingleUserById(currentUser) {
    const docRef = collection(db, "users");
    console.log(docRef, currentUser.uid);
    const queryData = query(docRef, where("uid", "==", currentUser.uid));
    try {
      const querySnapshot = await getDocs(queryData);
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data[0];
    } catch (error) {
      console.log(error);
    }
  }
  function signInAUserWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signOutCurrentUser() {
    return auth.signOut();
  }
  async function getUsers() {
    return await getAllUsers();
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
  useEffect(() => {
    let unsubscribe = null;
    async function fetchUser() {
      unsubscribe = await auth.onAuthStateChanged(async (user) => {
        console.log(user);
        if (user) setCurrentUser(await getSingleUserById(user));
        console.log(currentUser);
        setLoading(false);
      });
    }
    fetchUser();
    unsubscribe;
    // return unsubscribe;
  }, []);

  const sharedState = {
    createAUserWithEmailAndPassword,
    signInAUserWithEmailAndPassword,
    currentUser,
    signOutCurrentUser,
    signInWithGoogle,
    getUsers,
  };
  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}
