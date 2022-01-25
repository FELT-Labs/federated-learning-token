import type { AddEthereumChainParameter } from '@web3-react/metamask';

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
};

interface BasicChainInformation {
    url: string
    name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
    nativeCurrency: AddEthereumChainParameter['nativeCurrency']
    blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: [chainInformation.url],
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  }
  return chainId;
}

export const CHAINS: { [chainId: number]: BasicChainInformation | ExtendedChainInformation } = {
  1337: {
    url: process.env.REACT_APP_RPC_URL_1337 ?? '',
    name: 'Localhost',
  },
  80001: {
    url: process.env.REACT_APP_RPC_URL_80001 ?? '',
    name: 'Polygon Mumbai',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
};
