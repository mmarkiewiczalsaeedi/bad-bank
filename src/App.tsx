import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppShell } from "@mantine/core";
import { AllData } from "./components/AllData";
import { CreateAccount } from "./components/CreateAccount";
import { Deposit } from "./components/Deposit";
import { FooterComponent } from "./components/Footer";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { NavBar } from "./components/NavBar";
import { Withdraw } from "./components/Withdraw";
import { Header } from "./components/Header";

function App() {
	return (
		<AppShell
			header={<Header />}
			navbar={<NavBar />}
			footer={<FooterComponent />}
			style={{ backgroundColor: "rgba(218, 223, 238, 0.769)" }}
		>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create-account" element={<CreateAccount />} />
				<Route path="/login" element={<Login />} />
				<Route path="/deposit" element={<Deposit />} />
				<Route path="/withdraw" element={<Withdraw />} />
				<Route path="/alldata" element={<AllData />} />
			</Routes>
		</AppShell>
	);
}

export default App;
