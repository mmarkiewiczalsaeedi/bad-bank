import {
	Button,
	Card,
	Group,
	PasswordInput,
	Stack,
	TextInput,
} from "@mantine/core";
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { LogOutButton } from "./LogOutButton";

export const Login = () => {
	const [user] = useAuthState(auth);
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [error, setError] = useState(false);
	const [disableLogin, setDisableLogin] = useState(true);
	const [value] = useCollectionData(collection(db, "users"));

	const googleProvider = new GoogleAuthProvider();

	const handleLogin = async () => {
		signInWithEmailAndPassword(auth, loginEmail, loginPassword)
			.then(() => {
				setLoginEmail("");
				setLoginPassword("");
				setError(false);
			})
			.catch(() => {
				setError(true);
			});
	};

	const handleGoogleLogin = async () => {
		signInWithPopup(auth, googleProvider)
			.then(async (result) => {
				const user = result.user;

				const existingUser = value?.find((data) => {
					return data.uid === user.uid;
				});

				if (!existingUser) {
					await setDoc(doc(db, "users", user.uid), {
						uid: user.uid,
						name: user.email,
						email: user.email,
						password: "Google Auth",
						balance: 100,
						history: [],
					});
				}

				setLoginEmail("");
				setLoginPassword("");
				setError(false);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});
	};

	useEffect(() => {
		if (loginEmail && loginPassword && loginPassword.length >= 6) {
			setDisableLogin(false);
		}
	}, [loginEmail, loginPassword]);

	return (
		<div className="card-container">
			{!user ? (
				<Card shadow="lg" radius="xs" withBorder>
					<Stack align="center">
						<h3>Login</h3>

						<h5>Email</h5>
						<TextInput
							placeholder="your@email.com"
							style={{ width: "90%" }}
							value={loginEmail}
							onChange={(e) => setLoginEmail(e.currentTarget.value)}
						/>
						<h5>Password</h5>
						<PasswordInput
							placeholder="******"
							style={{ width: "90%" }}
							value={loginPassword}
							onChange={(e) => setLoginPassword(e.currentTarget.value)}
						/>
						{error ? "Wrong credentials!" : ""}

						<Group>
							<Button onClick={handleLogin} disabled={disableLogin}>
								Log In
							</Button>
							<Button onClick={handleGoogleLogin}>Google Login</Button>
						</Group>
					</Stack>
				</Card>
			) : (
				<Card shadow="lg" radius="xs" withBorder>
					<h5>You have successfully logged in!</h5>
					<p>Welcome, {user?.email}</p>

					<LogOutButton />
				</Card>
			)}
		</div>
	);
};
