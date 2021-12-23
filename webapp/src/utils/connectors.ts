import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS = {
  1337: process.env.REACT_APP_RPC_URL_1337 ?? '',
  // Matic
  137: process.env.REACT_APP_RPC_URL_137 ?? '',
  80001: process.env.REACT_APP_RPC_URL_80001 ?? '',
};

export const injected = new InjectedConnector({
  supportedChainIds: [137, 80001, 1337],
});

export const network = new NetworkConnector({
  urls: { 137: RPC_URLS[137], 80001: RPC_URLS[80001], 1337: RPC_URLS[1337] },
  defaultChainId: 137,
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 137: RPC_URLS[137] },
  qrcode: true,
});
