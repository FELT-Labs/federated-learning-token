import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';
import { CHAINS } from '../utils/chains';

// Default to Mumbai for now
const DEFAULT_CHAINID = 80001;

export const [network, hooks, store] = initializeConnector<Network>(
  (actions) => {
    // TODO: This is bit ugly, I created issue in web3-react for updating the Network constructor
    const connector = new Network(actions, CHAINS);
    connector.activate(DEFAULT_CHAINID);
    return connector;
  },
  Object.keys(CHAINS).map((chainId) => Number(chainId)),
);
