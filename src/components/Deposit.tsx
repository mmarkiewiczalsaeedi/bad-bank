import { Button, Card, Group, NumberInput, Stack } from "@mantine/core";
import {
	arrayUnion,
	doc,
	getDoc,
	increment,
	updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export const Deposit = () => {
	const [user, loading] = useAuthState(auth);
	const [balance, setBalance] = useState(0);
	const [deposit, setDeposit] = useState(0);
	const [successDeposit, setSuccessDeposit] = useState("");
	const navigate = useNavigate();

	const balanceStyle = {
		fontSize: "2rem",
	};

	useEffect(() => {
		const data = async () => {
			if (user) {
				const docSnap = await getDoc(doc(db, "users", user.uid));

				if (docSnap.exists()) {
					setBalance(docSnap.data().balance);
				}
			}
		};
		data();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const handleDeposit = async () => {
		const newBalance = balance + deposit;

		if (user) {
			const newData = {
				balance: increment(deposit),
				history: arrayUnion({
					type: "deposit",
					amount: deposit,
					newBalance,
					createdAt: new Date().toLocaleString(),
				}),
			};

			const docRef = doc(db, "users", user.uid);

			updateDoc(docRef, newData);
		}

		setBalance(newBalance);
		setSuccessDeposit("Succesful Transaction");
		setDeposit(0);
	};

	const handleRedirectLogin = () => {
		navigate("/login");
	};

	const handleRedirectCreate = () => {
		navigate("/create-account");
	};

	return (
		<>
			{user ? (
				<div className="card-container">
					<Card shadow="lg" radius="xs" withBorder>
						<Stack align="center">
							<h3>Deposit</h3>
							<h5>Deposit Amount</h5>
							<NumberInput
								type="number"
								id="deposit"
								value={deposit}
								onChange={(value: any) => setDeposit(value)}
							/>
							<p style={{ color: "green" }}>{!deposit ? successDeposit : ""}</p>

							<Button onClick={handleDeposit} disabled={!deposit}>
								Deposit
							</Button>

							<h5>Current Balance</h5>
							<p style={balanceStyle}>
								{user ? `$${balance}` : "Login to display Information"}
							</p>
						</Stack>
					</Card>
				</div>
			) : (
				<div className="card-container">
					<Card shadow="lg" radius="xs" withBorder>
						<h5>Login or Create Account First</h5>

						<Group position="center" grow style={{ marginTop: "1em" }}>
							<Button onClick={handleRedirectLogin}>Log In</Button>

							<Button onClick={handleRedirectCreate}>Create Account</Button>
						</Group>
					</Card>
				</div>
			)}
		</>
	);
};
