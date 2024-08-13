import { Stack, Grid, Card, Image, Text, Button, Center } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const Home = () => {
	const [user, loadingUser] = useAuthState(auth);

	if (loadingUser) return <>Loading your data...</>;

	return (
		<div className="app" style={{ padding: "2em", backgroundColor: "#f5f5f5" }}>
			{/* Centered container */}
			<div className="card-container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
				<Stack align="center" style={{ padding: "2em", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
					<h1>Welcome to <strong>Blissful Bank</strong></h1>
					<h2>{user?.email ? `${user.email}` : ""}</h2>
					<img 
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKgDi49UNajVHptGLFHwnKrWoJTFepRCtWUg&s" 
						alt="Blissful Bank Logo" 
						style={{ maxWidth: "20%", height: "auto", margin: "1em 0" }}
					/>
					<h3>Your money is <strong>Safe</strong>*, your mind is <strong>Blissful</strong></h3>
					<p>*everyone can see your email and password on AllData page.</p>
				</Stack>

				{/* Grid layout for cards */}
				<Grid gutter="md" className="mt-5" justify="center">
					<Grid.Col xs={12} sm={6} md={4}>
						<Card shadow="sm" p="lg" radius="md" withBorder>
							<Card.Section>
								<Image
									src="https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA"
									alt="Deposit"
									height={160}
								/>
							</Card.Section>
							<Stack align="center" spacing="xs" mt="md">
								<Text weight={500} size="lg">Deposit</Text>
								<Text align="center">Want to deposit your money safely? <strong>Make a deposit here</strong></Text>
								<Button
									variant="filled"
									color="dark"
									radius="md"
									style={{ marginTop: 14 }}
									component="a"
									href="/deposit"
								>
									<strong>Deposit</strong>
								</Button>
							</Stack>
						</Card>
					</Grid.Col>

					<Grid.Col xs={12} sm={6} md={4}>
						<Card shadow="sm" p="lg" radius="md" withBorder>
							<Card.Section>
								<Image
									src="https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU"
									alt="Withdraw"
									height={160}
								/>
							</Card.Section>
							<Stack align="center" spacing="xs" mt="md">
								<Text weight={500} size="lg">Withdraw</Text>
								<Text align="center">Want to withdraw your money? <strong>Withdraw money here</strong></Text>
								<Button
									variant="filled"
									color="dark"
									radius="md"
									style={{ marginTop: 14 }}
									component="a"
									href="/withdraw"
								>
									<strong>Withdraw</strong>
								</Button>
							</Stack>
						</Card>
					</Grid.Col>

					<Grid.Col xs={12} sm={6} md={4}>
						<Card shadow="sm" p="lg" radius="md" withBorder>
							<Card.Section>
								<Image
									src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
									alt="All Data"
									height={160}
								/>
							</Card.Section>
							<Stack align="center" spacing="xs" mt="md">
								<Text weight={500} size="lg">All Data</Text>
								<Text align="center">View all user and transaction history. <strong>View all user data here</strong></Text>
								<Button
									variant="filled"
									color="dark"
									radius="md"
									style={{ marginTop: 14 }}
									component="a"
									href="/alldata"
								>
									<strong>All Data</strong>
								</Button>
							</Stack>
						</Card>
					</Grid.Col>
				</Grid>
			</div>
		</div>
	);
};
