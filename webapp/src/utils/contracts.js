import { Contract } from '@ethersproject/contracts';

import map from "../artifacts/deployments/map.json"

export async function loadContract(chainId, name, library) {
    let chain = (chainId === 1337) ? "dev" : chainId;
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
    console.log(address);

	return new Contract(address.substr(2), contractArtifact.abi, library);
}