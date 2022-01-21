import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

export const [metaMask, hooks, store] = initializeConnector<MetaMask>((actions: any) => new MetaMask(actions));
