import { Divider, NavLink, Navbar, Stack, Title } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import {
	ArrowBarRight,
	ArrowBarToLeft,
	BuildingBank,
	Cash,
	Database,
	Home2,
	Login,
	UserPlus,
} from "tabler-icons-react";
import { auth } from "../firebase";
import { LogOutButton } from "./LogOutButton";

export const NavBar = () => {
	const location = useLocation();
	const [user] = useAuthState(auth);

	return (
		<Navbar height={"100vh"} width={{ base: 200 }}>
			<Navbar.Section mt="xs">
				<Stack align="center">
					<BuildingBank size={48} strokeWidth={2} color={"black"} />
					<Title order={1} align="center">
						Bad Bank
					</Title>
				</Stack>
			</Navbar.Section>
			<Divider size="md" style={{ margin: "1em" }} />
			<Navbar.Section grow>
				<NavLink
					label="Home"
					component={Link}
					to="/"
					active={location.pathname === "/"}
					icon={<Home2 size={24} strokeWidth={2} color={"black"} />}
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
							icon={<Login size={24} strokeWidth={2} color={"black"} />}
						/>
					</>
				) : (
					<>
						<NavLink
							label="Deposit"
							component={Link}
							to="/deposit"
							active={location.pathname === "/deposit"}
							icon={<Cash size={24} strokeWidth={2} color={"black"} />}
							rightSection={
								<ArrowBarToLeft size={24} strokeWidth={2} color={"black"} />
							}
						/>
						<NavLink
							label="Withdraw"
							component={Link}
							to="/withdraw"
							active={location.pathname === "/withdraw"}
							icon={<Cash size={24} strokeWidth={2} color={"black"} />}
							rightSection={
								<ArrowBarRight size={24} strokeWidth={2} color={"black"} />
							}
						/>
					</>
				)}
				<NavLink
					label="AllData"
					component={Link}
					to="/alldata"
					active={location.pathname === "/alldata"}
					icon={<Database size={24} strokeWidth={2} color={"black"} />}
				/>
			</Navbar.Section>
			<Navbar.Section>
				{user?.email && (
					<Stack
						align="center"
						spacing={2}
						style={{ marginBottom: "calc(1em + 40px)" }}
					>
						{user?.email}
						<LogOutButton />
					</Stack>
				)}
			</Navbar.Section>
		</Navbar>
	);
};
