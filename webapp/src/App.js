import React from "react";
import { Helmet } from "react-helmet";
// TODO: User BrowserRouter for server base app
import { HashRouter as Router, Route, Routes, Outlet, useLocation } from "react-router-dom";

import './assets/scss/custome.scss';

import MainNavbar from "./components/navbar.js";
import SimpleFooter from "./components/footer.js";
import Index from "./views/Index";
import AppEth from "./views/AppEth";


function App() {
	return (
		<>
			<Helmet>
				<title>FELT - Federated Learning Token</title>
				<meta name="description" content="Tool for running federated learning on blockchain." />
				<meta name="keywords" content="Federated Learning, Blockchain, Token, Solidity, Machine Learning" />
				<meta name="author" content="Břetislav Hájek" />
			</Helmet>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Index />} />
						<Route path="app/*" element={<AppEth />} />
						<Route path="*" element={<Index />} />
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App;


function Layout() {
	// Full navbar only on main page
	const full = useLocation().pathname === "/";

	return (
		<>
			<MainNavbar isFull={full}/>
			{/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
			<Outlet />
			<SimpleFooter />
		</>
	);
}
