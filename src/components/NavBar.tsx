import { Divider, NavLink, Navbar, Stack, Title } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import {
	ArrowBarRight,
	ArrowBarToLeft,
	BrandBeats,
	Coin,
	DatabaseExport,
	Home,
	DoorEnter,
	UserPlus,
} from "tabler-icons-react";
import { auth } from "../firebase";
import { LogOutButton } from "./LogOutButton";

export const NavBar = () => {
	const location = useLocation();
	const [user] = useAuthState(auth);

	return (
		<Navbar
		height={"95vh"}
		width={{ base: 450 }}
		style={{ marginTop: '100px' }} // Apply the marginTop here
	  >
			<Navbar.Section style={{ marginTop: "3em", marginBottom: "1em" }}>
				<Stack align="center">
					<BrandBeats size={60} strokeWidth={2} color={"black"} />
					<Title order={1} align="center">
						Blissful Bank
					</Title>
				</Stack>
			</Navbar.Section>
			<Divider size="md" style={{ margin: "2em" }} />
			<Navbar.Section grow>
				<NavLink
					label="Home"
					component={Link}
					to="/"
					active={location.pathname === "/"}
					icon={<Home size={24} strokeWidth={2} color={"black"} />}
				/>
				{!user?.email ? (
					<>
						<NavLink
							label="Create Account"
							component={Link}
							to="/create-account"
							active={location.pathname === "/create-account"}
							icon={<UserPlus size={24} strokeWidth={2} color={"black"} />}
						/>
						<NavLink
							label="Login"
							component={Link}
							to="/login"
							active={location.pathname === "/login"}
							icon={<DoorEnter size={24} strokeWidth={2} color={"black"} />}
						/>
					</>
				) : (
					<>
						<NavLink
							label="Deposit"
							component={Link}
							to="/deposit"
							active={location.pathname === "/deposit"}
							icon={<Coin size={24} strokeWidth={2} color={"black"} />}
							rightSection={
								<ArrowBarToLeft size={24} strokeWidth={2} color={"black"} />
							}
						/>
						<NavLink
							label="Withdraw"
							component={Link}
							to="/withdraw"
							active={location.pathname === "/withdraw"}
							icon={<Coin size={24} strokeWidth={2} color={"black"} />}
							rightSection={
								<ArrowBarRight size={24} strokeWidth={2} color={"black"} />
							}
						/>
					</>
				)}
				<NavLink
					label="All Data"
					component={Link}
					to="/alldata"
					active={location.pathname === "/alldata"}
					icon={<DatabaseExport size={24} strokeWidth={2} color={"black"} />}
				/>
			</Navbar.Section>
		</Navbar>
	);
};
