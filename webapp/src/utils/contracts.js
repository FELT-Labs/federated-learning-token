import { Contract, ContractFactory } from 'ethers';

import map from '../artifacts/deployments/map.json';

function getChain(chainId) {
  return chainId === 1337 ? 'dev' : chainId;
}

export function getContractAddress(chainId, name) {
  const chain = getChain(chainId);
  try {
    return map[chain][name].at(-1);
  } catch (e) {
    console.log(
      `Couldn't find any deployed contract "${name}" on the chain "${chain}".`,
    );
    return undefined;
  }
}

export async function loadContract(chainId, name, library) {
  const chain = getChain(chainId);
  const address = getContractAddress(chainId, name);

  if (address === undefined) {
    return undefined;
  }

  let contractArtifact;
  try {
    contractArtifact = await import(
      `../artifacts/deployments/${chain}/${address}.json`
    );
  } catch (e) {
    console.log(
      `Failed to load contract artifact "../artifacts/deployments/${chain}/${address}.json"`,
    );
    return undefined;
  }

  return new Contract(address.substr(2), contractArtifact.abi, library);
}

export async function getContractFactory(name, signer) {
  let contractArtifact;
  try {
    contractArtifact = await import(`../artifacts/contracts/${name}.json`);
  } catch (e) {
    console.log(
      `Failed to load contract artifact "../artifacts/contracts/${name}.json"`,
    );
    return undefined;
  }

  return new ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    signer,
  );
}

export async function getProjectContract(address, library) {
  let contractArtifact;
  try {
    contractArtifact = await import(
      `../artifacts/contracts/ProjectContract.json`
    );
  } catch (e) {
    console.log(
      `Failed to load contract artifact "../artifacts/contracts/ProjectContract.json"`,
    );
    return undefined;
  }

  return new Contract(address, contractArtifact.abi, library);
}
