import { FC } from 'react';
import { Signer } from 'ethers';
import { Button, Row, Col } from 'reactstrap';
import { useWeb3React } from '@web3-react/core';

import { getContractFactory, getContractAddress } from '../utils/contracts';
import Breadcrumbs from '../components/dapp/Breadcrumbs';

async function deployContract(
  name: string,
  description: string,
  chainId: number,
  signer: Signer,
) {
  const tokenAddress = getContractAddress(chainId, 'FELToken');
  const factory = await getContractFactory('ProjectContract', signer);

  const address = await signer.getAddress();
  const deployArgs = [
    tokenAddress,

    true,
    new Uint8Array(32).fill(0),

    new Uint8Array(32).fill(0),
    address,
    address,
    2,
  ];
  // console.log(deployArgs);
  // let manager = await loadContract(chainId, "ProjectManager", signer);
  // await manager.activateProject(address, "xxxx", "description of this super cool thing", 0);

  if (factory) {
    await factory.deploy(...deployArgs);
  }
}

const breadcrumbLinks = [
  {
    link: '',
    name: 'Create Project',
  },
];

const CreateProject: FC = () => {
  const { chainId, library } = useWeb3React();
  return (
    <main>
      <Breadcrumbs title="Create Project" links={breadcrumbLinks} />
      <Row className="p-3">
        <Col>
          <Button
            onClick={async () => {
              if (chainId) {
                await deployContract(
                  'test',
                  'description',
                  chainId,
                  library.getSigner(),
                );
              }
            }}
          >
            Click me
          </Button>
        </Col>
      </Row>
    </main>
  );
};

export default CreateProject;
