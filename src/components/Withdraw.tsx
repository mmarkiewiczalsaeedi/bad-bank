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

export const Withdraw = () => {
	const [user, loading] = useAuthState(auth);
	const [withdraw, setWithdraw] = useState(0);
	const [balance, setBalance] = useState(0);
	const [successWithdraw, setSuccessWithdraw] = useState("");
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

	const handleWithdraw = () => {
		const newBalance = balance - withdraw;

		if (user) {
			const newData = {
				balance: increment(-withdraw),
				history: arrayUnion({
					type: "withdraw",
					amount: withdraw,
					newBalance,
					createdAt: new Date().toLocaleString(),
				}),
			};

			const docRef = doc(db, "users", user.uid);

			updateDoc(docRef, newData);
		}

		setBalance(newBalance);
		setSuccessWithdraw("Succesful Transaction");
		setWithdraw(0);
	};

	const handleRedirectLogin = () => {
		navigate("/login");
	};

	const handleRedirectCreate = () => {
		navigate("/create-account");
	};

	if (loading) return <>Loading...</>;

	return (
		<>
			{user ? (
				<div className="card-container">
					<Card shadow="lg" radius="xs" withBorder>
						<Stack align="center">
							<h3>Withdraw</h3>
							{balance ? (
								<>
									<h5>Withdraw Amount</h5>
									<NumberInput
										type="number"
										value={withdraw}
										max={balance}
										onChange={(value: any) => setWithdraw(value)}
									/>
									<p style={{ color: "green" }}>
										{withdraw > balance || withdraw ? "" : successWithdraw}
									</p>
									<p style={{ color: "red" }}>
										{withdraw > balance ? "Amount Higher than Balance" : ""}
									</p>

									<Button
										onClick={handleWithdraw}
										disabled={!!(withdraw > balance || !withdraw)}
									>
										Withdraw
									</Button>
								</>
							) : (
								<>
									<h5>Withdraw Amount</h5>
									<p>
										Balance is currently $0
										<br />
										Put some cash in!!!
									</p>
								</>
							)}

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
