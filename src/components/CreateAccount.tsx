import { Button, Card, PasswordInput, Stack, TextInput } from "@mantine/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { LogOutButton } from "./LogOutButton";

export const CreateAccount = () => {
	const [user] = useAuthState(auth);
	const [status, setStatus] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disableButton, setDisableButton] = useState(true);
	const [shortPass, setShortPass] = useState(false);
	const [error, setError] = useState(false);

	const validate = (field: any, label: any) => {
		if (!field) {
			setStatus(`Error: ${label}`);
			setTimeout(() => setStatus(""), 3000);
			console.log(status);
			return false;
		}
		return true;
	};

	const handleCreate = async () => {
		setError(false);
		setShortPass(false);
		if (password.length < 6) {
			setShortPass(true);
			return;
		}
		if (!validate(name, "name")) return;
		if (!validate(email, "email")) return;
		if (!validate(password, "password")) return;

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				await setDoc(doc(db, "users", user.uid), {
					uid: user.uid,
					name: name,
					email: email,
					password: password,
					balance: 100,
					history: [],
				});
			})
			.catch((err) => {
				setError(err);
			});

		setName("");
		setEmail("");
		setPassword("");
	};

	useEffect(() => {
		if (name && email && password) {
			setDisableButton(false);
		}
	}, [name, email, password]);

	return (
		<div className="card-container">
			{!user ? (
				<Card shadow="lg" radius="xs" withBorder>
					<Stack align="center">
						<h3>Create Account</h3>

						<h5>Name</h5>
						<TextInput
							placeholder="First Name, Last Name"
							style={{ width: "90%" }}
							value={name}
							onChange={(e) => setName(e.currentTarget.value)}
						/>
						<h5>Email</h5>
						<TextInput
							placeholder="your@email.com"
							style={{ width: "90%" }}
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
						<h5>Password</h5>
						<PasswordInput
							placeholder="******"
							style={{ width: "90%" }}
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<br />
						{shortPass
							? "*Password need to be more than 6 character long!"
							: ""}
						{error ? "Error Occured. Email might be already in use!" : ""}

						<Button onClick={handleCreate} disabled={disableButton}>
							Create Account
						</Button>
					</Stack>
				</Card>
			) : (
				<Card shadow="lg" radius="xs" withBorder>
					<h5>Your account has been successfully created</h5>
					<p>You are a new user: {user?.email}</p>

					<LogOutButton />
				</Card>
			)}
		</div>
	);
};
