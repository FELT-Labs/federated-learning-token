import { FC } from "react";
import { Helmet } from "react-helmet";
// TODO: User BrowserRouter for server base app
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import './assets/scss/custome.scss';

import Home from "./views/Home";
import AppEth from "./views/AppEth";


const App: FC = () => {
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
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="app" element={<AppEth />} />
						<Route path="*" element={<Home />} />
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App;
