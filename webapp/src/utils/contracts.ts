import { Contract, ContractFactory, Signer, providers } from 'ethers';
import { isKeyof } from './indexGuard';
import map from '../artifacts/deployments/map.json';

type Provider = providers.Provider;

function getChain(chainId: number): string {
  return (chainId === 1337) ? 'dev' : chainId.toString();
}

export function getContractAddress(chainId: number, name: string): undefined | string {
  const chain = getChain(chainId);

  if (isKeyof(chain, map) && isKeyof(name, map[chain])) return map[chain][name].at(-1);

  return undefined;
}

export async function loadContract(
  chainId: number,
  name: string,
  library: Signer | Provider,
): Promise<undefined | Contract> {
  const chain = getChain(chainId);
  const address = getContractAddress(chainId, name);

  if (address === undefined) return undefined;

  try {
    const contractArtifact = await import(`../artifacts/deployments/${chain}/${address}.json`);
    return new Contract(address.substring(2), contractArtifact.abi, library);
  } catch (e) {
    return undefined;
  }
}

export async function getContractFactory(
  name: string,
  signer: Signer,
): Promise<undefined | ContractFactory> {
  let contractArtifact;
  try {
    contractArtifact = await import(`../artifacts/contracts/${name}.json`);
  } catch (e) {
    return undefined;
  }

  return new ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    signer,
  );
}

export async function getProjectContract(address: string, library: Signer | Provider): Promise<Contract | undefined> {
  try {
    const contractArtifact = await import('../artifacts/contracts/ProjectContract.json');
    return new Contract(address, contractArtifact.abi, library);
  } catch (e) {
    return undefined;
  }
}
