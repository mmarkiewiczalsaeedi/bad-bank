import {
	Accordion,
	Avatar,
	Center,
	Group,
	Loader,
	Stack,
	Table,
} from "@mantine/core";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

// Utility function to get initials from the name
const getInitials = (name: string) => {
	if (!name) return '';

	const nameParts = name.trim().split(' ');

	if (nameParts.length > 1) {
		return (
			nameParts[0].charAt(0).toUpperCase() + 
			nameParts[1].charAt(0).toUpperCase()
		);
	}

	return nameParts[0].charAt(0).toUpperCase();
};

export const AllData = () => {
	const [currentUser] = useAuthState(auth);
	const [value, loading] = useCollectionData(collection(db, "users"));

	const usersList = value?.map((data: any, i: number) => {
		// Calculate initials using the getInitials function
		const initials = getInitials(data.name);

		const transactionHistory = data.history.map((hist: any, i: number) => {
			let style: object;
			if (hist.type === "deposit") {
				style = { color: "green" };
			} else {
				style = { color: "red" };
			}

			return (
				<tr key={i} style={style}>
					<td style={{ textAlign: "center" }}>{hist.type.toUpperCase()}</td>
					<td style={{ textAlign: "center" }}>${hist.newBalance}</td>
					<td style={{ textAlign: "center" }}>{hist.createdAt}</td>
				</tr>
			);
		});

		return (
			<Accordion.Item value={data.name} key={data.uid}>
			<Accordion.Control>
				<Group align="center"> {/* Center alignment for vertical alignment */}
					<Avatar
						radius="xl"
						size="lg"
						alt={data.name || 'User Avatar'}
						sx={{
							backgroundColor: '#e0f7fa', // Light cyan background
							border: '2px solid #00838f', // Teal border
							color: '#00838f', // Text color matching the border
							fontWeight: 'bold', // Bold text for initials
							fontSize: '18px', // Font size for initials
						}}
					>
						{initials}
					</Avatar>
					<h3 style={{ fontSize: '20px', margin: 0, lineHeight: '1.5' }}> {/* Ensure line height and margin are controlled */}
						{data.name}{" "}
						{data.uid === currentUser?.uid ? (
							<span style={{ color: "green" }}>- Current User</span>
						) : (
							""
						)}
					</h3>
				</Group>
			</Accordion.Control>
				<Accordion.Panel>
					<>
						<h5>Current Balance: ${data.balance}</h5> {/* Current Balance first */}
						<br></br>
						<h6>Name: {data.name}</h6> {/* Name next */}
						<h6>Email: {data.email}</h6> {/* Email next */}
						<h6>Password: {data.password}</h6> {/* Password last */}
						<br></br>
						<p style={{ textAlign: "center" }}><strong>Transaction History:</strong></p>
						<br></br>
						<Table striped highlightOnHover>
							<thead>
								<tr>
									<th style={{ textAlign: "center" }}>Transaction Type</th>
									<th style={{ textAlign: "center" }}>New Balance</th>
									<th style={{ textAlign: "center" }}>Date and Time</th>
								</tr>
							</thead>
							<tbody>{transactionHistory}</tbody>
						</Table>
					</>
				</Accordion.Panel>
			</Accordion.Item>
		);
	});

	if (loading) {
		return (
			<Center style={{ marginTop: "5em" }}>
				<Loader color="dark" size="xl" variant="bars" />
			</Center>
		);
	}

	return (
		<Stack align="center" style={{ paddingTop: "4em" }}>
			<h1>All Data</h1>
			<Accordion
				style={{ width: "75%" }}
				variant="separated"
				defaultValue="userData"
				radius="xs"
			>
				{usersList}
			</Accordion>
		</Stack>
	);
};
