import React from 'react';
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { providers } from 'ethers';
import { Route, Routes } from 'react-router-dom';

import { useEagerConnect, useInactiveListener } from '../utils/hooks';
import { injected, network, walletconnect } from '../utils/connectors';

import Projects from './Projects';
import Sidebar from '../components/sidebar';
import HomeNavbar from '../components/navbar/HomeNavbar';
import HomeFooter from '../components/footer/HomeFooter';
import CreateProject from './CreateProject';
import Project from './Project';

const ConnectorNames = {
  Injected: 'Injected',
  Network: 'Network',
  WalletConnect: 'WalletConnect',
};

const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
};

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

function getLibrary(provider) {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function AppEth() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
export default AppEth;

function App() {
  const context = useWeb3React();
  const { connector, library, account, activate, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }

    // Connect to network by default
    if (!connector) {
      setActivatingConnector(connectorsByName[ConnectorNames.Network]);
      activate(connectorsByName[ConnectorNames.Network]);
    }
  }, [activatingConnector, connector, activate]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const activateConnector = (name) => {
    setActivatingConnector(connectorsByName[name]);
    activate(connectorsByName[name]);
  };

  const isActivating = (name) => activatingConnector !== connectorsByName[name];

  return (
    <>
      <HomeNavbar />
      <div className="d-flex">
        <Sidebar {...{ isActivating, activateConnector }} />
        <div className="w-100 sidebar-content">
          <Routes>
            <Route index element={<Projects />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path="project/:address" element={<Project />} />
          </Routes>
          {!!error && (
            <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>
              {getErrorMessage(error)}
            </h4>
          )}
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
