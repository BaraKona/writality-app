import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { auth, googleAuthProvider, db } from "../api/firebase";
import { registerUser, getAllUsers, loginUser } from "../api/user";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { useToast } from "../hooks";

type AuthContextType = {
	createAUserWithEmailAndPassword: ({
		name,
		email,
		password,
	}: {
		name: string;
		email: string;
		password: string;
	}) => Promise<void>;
	signInAUserWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;
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
	async function createAUserWithEmailAndPassword({
		name,
		email,
		password,
	}: {
		name: string;
		email: string;
		password: string;
	}) {
		await registerUser({ name, email, password })
			.then((user) => {
				setCurrentUser(user);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	async function signInAUserWithEmailAndPassword(
		email: string,
		password: string
	) {
		const user = await loginUser({ email, password });
		setCurrentUser(user);
	}
	function signOutCurrentUser() {
		return auth.signOut().then(() => {
			// Sign-out successful.
			window.location.href = "/";
		});
	}

	async function signInWithGoogle() {
		await signInWithPopup(auth, googleAuthProvider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
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
	// useEffect(() => {
	// 	const gettingUsers = async () => {
	// 		const users = await getAllUsers();
	// 		setUsers(users);
	// 	};
	// 	gettingUsers();
	// }, []);
	const sharedState = {
		createAUserWithEmailAndPassword,
		signInAUserWithEmailAndPassword,
		currentUser,
		signOutCurrentUser,
		signInWithGoogle,
		users,
		setCurrentUser,
		setUsers,
	};

	return (
		<AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
	);
}
