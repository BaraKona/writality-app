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
	currentUser: IUser;
	setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const authContextDefaultValues: AuthContextType = {
	currentUser: {} as IUser,
	setCurrentUser: () => {},
	isLoading: false,
	setIsLoading: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuthContext() {
	return useContext(AuthContext);
}

export function AuthContextWrapper({ children }: { children: ReactNode }) {
	const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);

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
