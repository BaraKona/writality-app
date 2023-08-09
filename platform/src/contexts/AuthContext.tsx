import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

import { getUser } from "../api/user";
import { IUser } from "../interfaces/IUser";

type AuthContextType = {
	currentUser: IUser | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const authContextDefaultValues: AuthContextType = {
	currentUser: null,
	setCurrentUser: () => {},
	isLoading: false,
	setIsLoading: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuthContext() {
	return useContext(AuthContext);
}

export function AuthContextWrapper({ children }: { children: ReactNode }) {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getCurrentUser = async () => {
			const user = await getUser();
			setCurrentUser(user);
			setIsLoading(false);
		};
		getCurrentUser();
	}, []);
	const sharedState = {
		currentUser,
		isLoading,
		setIsLoading,
		setCurrentUser,
	};

	return (
		<AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
	);
}
