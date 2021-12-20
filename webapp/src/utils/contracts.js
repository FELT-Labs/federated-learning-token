import { Contract, ContractFactory } from '@ethersproject/contracts';

import map from "../artifacts/deployments/map.json"


function getChain(chainId) {
    return ((chainId === 1337) ? "dev" : chainId);
}

export function getContractAddress(chainId, name) {
    let chain = getChain(chainId);
    try {
        return map[chain][name].at(-1);
    } catch (e) {
        console.log(`Couldn't find any deployed contract "${name}" on the chain "${chain}".`)
        return undefined
    }
}

export async function loadContract(chainId, name, library) {
    let chain = getChain(chainId);
    let address = getContractAddress(chainId, name);

    let contractArtifact;
    try {
        contractArtifact = await import(`../artifacts/deployments/${chain}/${address}.json`)
    } catch (e) {
        console.log(`Failed to load contract artifact "../artifacts/deployments/${chain}/${address}.json"`)
        return undefined
    }

    return new Contract(address.substr(2), contractArtifact.abi, library);
}


export async function getContractFactory(name, signer) {
    let contractArtifact;
    try {
        contractArtifact = await import(`../artifacts/contracts/${name}.json`);
    } catch (e) {
        console.log(`Failed to load contract artifact "../artifacts/contracts/${name}.json"`)
        return undefined
    }

    return new ContractFactory(contractArtifact.abi, contractArtifact.bytecode, signer);
}