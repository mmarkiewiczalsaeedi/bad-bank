import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

export const UserContext = createContext<any>("");

const UserProvider = ({ children }: { children: any }) => {
	const [user, setUser] = useState<any>({});
	const [userInfo, setUserInfo] = useState({});
	const [userUID, setUserUID] = useState("");

	onAuthStateChanged(auth, (user: any) => {
		if (user) {
			setUser(user);
			setUserUID(user.uid);
		}
	});

	const data = async () => {
		if (user.email) {
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				setUserInfo(userData);
			} else {
				console.log("No such document!");
			}
		}
	};

	useEffect(() => {
		data();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.email]);

	return (
		<UserContext.Provider value={{ user, userUID, userInfo }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
