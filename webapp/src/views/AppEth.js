import React from 'react';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
	NoEthereumProviderError,
	UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

import { useEagerConnect, useInactiveListener } from '../utils/hooks';
import {
	injected,
	network,
	walletconnect,
} from '../utils/connectors';

import map from "../artifacts/deployments/map.json"
import Sidebar from "../components/sidebar";


const ConnectorNames = {
	Injected: 'Injected',
	Network: 'Network',
	WalletConnect: 'WalletConnect',
};


const connectorsByName = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.Network]: network,
	[ConnectorNames.WalletConnect]: walletconnect,
}


function getErrorMessage(error) {
	if (error instanceof NoEthereumProviderError) {
		return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
	} else if (error instanceof UnsupportedChainIdError) {
		return "You're connected to an unsupported network."
	} else if (
		error instanceof UserRejectedRequestErrorInjected ||
		error instanceof UserRejectedRequestErrorWalletConnect
	) {
		return 'Please authorize this website to access your Ethereum account.'
	} else {
		console.error(error)
		return 'An unknown error occurred. Check the console for more details.'
	}
}


function getLibrary(provider) {
	const library = new Web3Provider(provider);
	library.pollingInterval = 12000;
	return library;
}


function AppEth() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<App />
		</Web3ReactProvider>
	)
}
export default AppEth;


function ChainId() {
	const { chainId } = useWeb3React()

	return (
		<>
			<span>Chain Id</span>
			<span role="img" aria-label="chain">
				⛓
			</span>
			<span>{chainId ?? ''}</span>
		</>
	)
}


async function loadContract(chain, name, library) {
	let address, contractArtifact;
	try {
		address = map[chain][name].at(-1);
	} catch (e) {
		console.log(`Couldn't find any deployed contract "${name}" on the chain "${chain}".`)
		return undefined
	}

	try {
		contractArtifact = await import(`../artifacts/deployments/${chain}/${address}.json`)
	} catch (e) {
		console.log(`Failed to load contract artifact "./artifacts/deployments/${chain}/${address}.json"`)
		return undefined
	}

	return new Contract(address, contractArtifact.abi, library);
}


class ContractName extends React.Component {
	state = {
		contract: undefined,
		balance: undefined
	}

	async componentDidUpdate(prevProps) {
		const { chainId, library, account, connector } = this.props;

		let contract, balance;
		if (prevProps.chainId !== chainId
			|| prevProps.library !== library
			|| prevProps.account !== account
			|| prevProps.connector !== connector
		) {
			let _chainId = (chainId === 1337) ? "dev" : chainId;
			contract = await loadContract(_chainId, "FELToken", library);
			console.log("Contract", contract);

			if (contract) {
				const tokenName = await contract.name();
				balance = await contract.balanceOf(account);
				console.log("name", tokenName, balance);
			}
			this.setState({ balance, contract });
		}
	}

	render() {
		console.log(this.props);
		return (
			<>
				<span>Amount of FELToken:</span>
				<span></span>
				<span>{this.state.balance ? this.state.balance.toString() : ""}</span>
			</>
		)
	}
}


function BlockNumber() {
	const { chainId, library } = useWeb3React()

	const [blockNumber, setBlockNumber] = React.useState()
	React.useEffect(() => {
		if (!!library) {
			let stale = false

			library
				.getBlockNumber()
				.then((blockNumber) => {
					if (!stale) {
						setBlockNumber(blockNumber)
					}
				})
				.catch(() => {
					if (!stale) {
						setBlockNumber(null)
					}
				})

			const updateBlockNumber = (blockNumber) => {
				setBlockNumber(blockNumber)
			}
			library.on('block', updateBlockNumber)

			return () => {
				stale = true
				library.removeListener('block', updateBlockNumber)
				setBlockNumber(undefined)
			}
		}
	}, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

	return (
		<>
			<span>Block Number</span>
			<span role="img" aria-label="numbers">
				🔢
			</span>
			<span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
		</>
	)
}


function Account() {
	const { account } = useWeb3React()

	return (
		<>
			<span>Account</span>
			<span role="img" aria-label="robot">
				🤖
			</span>
			<span>
				{account === null
					? '-'
					: account
						? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
						: ''}
			</span>
		</>
	)
}


function Balance() {
	const { account, library, chainId } = useWeb3React()

	const [balance, setBalance] = React.useState()
	React.useEffect(() => {
		if (!!account && !!library) {
			let stale = false

			library
				.getBalance(account)
				.then((balance) => {
					if (!stale) {
						setBalance(balance)
					}
				})
				.catch(() => {
					if (!stale) {
						setBalance(null)
					}
				})

			return () => {
				stale = true
				setBalance(undefined)
			}
		}
	}, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

	return (
		<>
			<span>Balance</span>
			<span role="img" aria-label="gold">
				💰
			</span>
			<span>{balance === null ? 'Error' : balance ? `Ξ${balance}` : ''}</span>
		</>
	)
}

function Header() {
	const { active, error, account, connector, library, chainId } = useWeb3React()

	return (
		<>
			<h1 style={{ margin: '1rem', textAlign: 'right' }}>{active ? '🟢' : error ? '🔴' : '🟠'}</h1>
			<h3
				style={{
					display: 'grid',
					gridGap: '1rem',
					gridTemplateColumns: '1fr min-content 1fr',
					maxWidth: '20rem',
					lineHeight: '2rem',
					margin: 'auto'
				}}
			>
				<ChainId />
				<BlockNumber />
				<Account />
				<Balance />
				<ContractName {...{ account, connector, library, chainId }} />
			</h3>
		</>
	)
}

function App() {
	const context = useWeb3React()
	const { connector, library, account, activate, error } = context

	// handle logic to recognize the connector currently being activated
	const [activatingConnector, setActivatingConnector] = React.useState()
	React.useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}

		// Connect to network by default
		if (!connector) {
			setActivatingConnector(connectorsByName[ConnectorNames.Network])
			activate(connectorsByName[ConnectorNames.Network])
		}
	}, [activatingConnector, connector, activate])

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect()

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector)

	const activateConnector = (name) => {
			setActivatingConnector(connectorsByName[name]);
			activate(connectorsByName[name]);
	}

	const isActivating = (name) => activatingConnector !== connectorsByName[name];

	return (
		<div className="d-flex">
			<Sidebar {...{isActivating, activateConnector}} />
			<div className="w-100">
				<Header />
				<hr style={{ margin: '2rem' }} />

				{!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}

				<div
					style={{
						display: 'grid',
						gridGap: '1rem',
						gridTemplateColumns: 'fit-content',
						maxWidth: '20rem',
						margin: 'auto'
					}}
				>
					{!!(library && account) && (
						<button
							style={{
								height: '3rem',
								borderRadius: '1rem',
								cursor: 'pointer'
							}}
							onClick={() => {
								library
									.getSigner(account)
									.signMessage('👋')
									.then((signature) => {
										window.alert(`Success!\n\n${signature}`)
									})
									.catch((error) => {
										window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
									})
							}}
						>
							Sign Message
						</button>
					)}
	
				</div>
			</div>
		</div>
	)
}