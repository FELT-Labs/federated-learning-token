import React from 'react';

// core components
import { getContractFactory, getContractAddress } from '../utils/contracts';
import { Button } from 'reactstrap';
import { useWeb3React } from '@web3-react/core';

async function deployContract(name, description, chainId, library) {
  const signer = library.getSigner();
  const tokenAddress = getContractAddress(chainId, 'FELToken');
  const factory = await getContractFactory('ProjectContract', signer);

  const address = await library.getSigner().getAddress();
  const deployArgs = [
    tokenAddress,

    true,
    new Uint8Array(32).fill(0),

    new Uint8Array(32).fill(0),
    address,
    address,
    2,
  ];
  console.log(deployArgs);
  // let manager = await loadContract(chainId, "ProjectManager", library.getSigner());
  // await manager.activateProject(address, "xxxx", "description of this super cool thing", 0);

  const contract = await factory.deploy(...deployArgs);
  console.log('Contract', contract);
  console.log('finished');
}

function CreateProject() {
  const { chainId, library } = useWeb3React();
  return (
    <main>
      <Button
        onClick={async () =>
          await deployContract('test', 'description', chainId, library)
        }
      >
        Click me
      </Button>
    </main>
  );
}

export default CreateProject;
