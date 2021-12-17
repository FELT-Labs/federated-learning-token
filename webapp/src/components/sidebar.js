import React, { useState } from "react";
import { Input, NavItem, NavLink, Nav, Button, Spinner } from "reactstrap";
import classNames from "classnames";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from '@ethersproject/units'
import { Box, ChevronLeft, ChevronRight, User, DollarSign } from "react-feather";

import { network, walletconnect, injected } from '../utils/connectors';
import SimpleTooltip from "./tooltip";
import { ReactComponent as TokenSvg } from "../assets/logo.svg";
import { ReactComponent as MetaMaskSvg } from "../assets/metamask-fox.svg";
import { ReactComponent as WalletConnectSvg } from "../assets/walletconnect-logo.svg";


const SupportedChains = {
	137: "Polygon Mainnet",
	80001: "Matic Mumbai (testnet)",
	1337: "Local Network (testnet)"
}


function Balance() {
	const { account, library, chainId } = useWeb3React()

	const [balance, setBalance] = React.useState()
	React.useEffect(() => {
		if (!!account && !!library) {
			let stale = false;

			library
				.getBalance(account)
				.then((balance) => !stale && setBalance(balance))
				.catch(() => !stale && setBalance(null));

			return () => {
				stale = true;
				setBalance(undefined);
			}
		}
	}, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

	return (
		<>
			<div id="balanceEther" className="row mb-3 px-3 align-items-center">
				<DollarSign className="col-sm-2" color="white" />
				<span className="col-sm-10">
					{!!balance && formatEther(balance.toString())}
				</span>
				<SimpleTooltip placement="bottom" target="balanceEther" >
					Account Polygon balance
				</SimpleTooltip>
			</div>
			<div id="balanceToken" className="row mb-3 px-3 align-items-center">
				<TokenSvg fill="white" className="col-sm-2" width="24" height="24" />
				<span className="col-sm-10">
					TODO: token balance
				</span>
				<SimpleTooltip placement="bottom" target="balanceToken" >
					Account FELT token balance
				</SimpleTooltip>
			</div>
		</>
	)
}


function Sidebar({ isActivating, activateConnector }) {
	const { account, chainId, connector, deactivate } = useWeb3React();
	const [isOpen, toggle] = useState(true);



	return (
		<div className={classNames("sidebar", { "is-open": isOpen })}>
			<Button className="toggleButton mb-3 p-0" onClick={() => toggle(!isOpen)}
				tag={isOpen ? ChevronLeft : ChevronRight}
			/>

			{/* Blockchain display + select */}
			<div id="chain-input" className="row px-3 mb-3 align-items-center">
				<Box className="col-sm-2" color="white" />
				<div className="col-sm-10">
					{(connector === network) ?
						<Input
							name="select"
							type="select"
							value={chainId}
							onChange={e => connector.changeChainId(e.target.value)}
						>
							{Object.keys(SupportedChains).map((id) => (
								<option key={id} value={id}>{SupportedChains[id]}</option>
							))}
						</Input>
						: SupportedChains[chainId]
					}
				</div>
				<SimpleTooltip placement="bottom" target="chain-input" >
					Selected blockchain{(connector !== network) ? ", change it inside MetaMask or your WalletConnect" : ""}
				</SimpleTooltip>
			</div>

			{/* User address */}
			<div id="user" className="row mb-3 px-3 align-items-center">
				<User className="col-sm-2" color="white" />
				<span className="col-sm-10">
					{account
						? <>
						{account.substring(0, 8)}...{account.substring(account.length - 4)}
							{connector === injected && <MetaMaskSvg className="cursor-default mx-2 p-0 btn btn-secondary" height="20" width="20" />}
							{connector === walletconnect && <WalletConnectSvg className="cursor-default mx-2 p-0 btn btn-secondary" height="20" width="20" />}
						</>
						: 'No account connected'}
				</span>
				<SimpleTooltip placement="bottom" target="user" >
					Your connected account address
				</SimpleTooltip>
			</div>

			{/* User balances */}
			{!!account && <Balance />}

			<hr className="m-3" />

			<Nav pills vertical fill className="mx-3">
				{account ?
					<>
						<NavItem>
							{/* TODO: maybe use connector.close() for WalletConnect, see example app */}
							<NavLink onClick={() => deactivate()}>
								Disconnect
							</NavLink>
						</NavItem>
					</>
					:
					<>
						<NavItem>
							<NavLink onClick={() => activateConnector("Injected")}>
								{isActivating("Injected") ?
									<MetaMaskSvg height="24" width="24" />
									: <Spinner style={{height: "15px", width: "15px"}} />
								} Connect MetaMask
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink onClick={() => activateConnector("WalletConnect")}>
								{isActivating("WalletConnect") ?
									<WalletConnectSvg height="24" width="24" />
									: <Spinner style={{height: "15px", width: "15px"}} />
								} Connect WalletConnect
							</NavLink>
						</NavItem>
					</>
				}
			</Nav>
		</div>)
};

export default Sidebar;