import { getPriorityConnector } from '@web3-react/core';
import { hooks as metaMaskHooks, metaMask } from './metaMask';
import { hooks as networkHooks, network } from './network';

export const hooks = getPriorityConnector(
  [metaMask, metaMaskHooks],
  [network, networkHooks],
);
