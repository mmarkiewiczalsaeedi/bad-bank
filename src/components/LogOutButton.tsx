import { Button } from "@mantine/core";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Logout } from "tabler-icons-react";
import { auth } from "../firebase";

export const LogOutButton = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		navigate("/");
	};
	return (
		<Button onClick={handleLogout} leftIcon={<Logout />}>
			Log Out
		</Button>
	);
};
