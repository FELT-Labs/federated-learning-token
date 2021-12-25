import { FC, useState } from 'react';
import { Signer } from 'ethers';
import {
  Button,
  Row,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
  Card,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Spinner,
  Progress,
} from 'reactstrap';
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
    // await factory.deploy(...deployArgs);
  }
}

const breadcrumbLinks = [
  {
    link: '',
    name: 'Create Project',
  },
];

const CreateProject: FC = () => {
  const { chainId, library, account } = useWeb3React();
  const isActive = account && chainId;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const deploy = async () => {
    if (chainId) {
      setProgress(1);
      setShowModal(true);
      await deployContract(name, description, chainId, library.getSigner());
      setProgress(2);
    }
  };

  return (
    <main>
      <Breadcrumbs title="Create Project" links={breadcrumbLinks} />
      <Row className="px-4 px-sm-5 pb-5 justify-content-center">
        <Card body className="shadow border-0" style={{ maxWidth: '800px' }}>
          <Form>
            <FormGroup>
              <Label for="projectName">Project Name</Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Awesome Project"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                id="description"
                name="text"
                type="textarea"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value.substring(0, 128))
                }
              />
              <FormText>Characters left: {128 - description.length}</FormText>
            </FormGroup>
            <Button disabled={!isActive} color="primary" onClick={deploy}>
              Deploy {showModal && <Spinner size="sm" />}
            </Button>
          </Form>
        </Card>
      </Row>

      <Modal centered isOpen={showModal}>
        <ModalHeader>Deployment in progress</ModalHeader>
        <ModalBody>Don&apos;t close this browser tab while running!</ModalBody>
        <Progress
          animated
          color="success"
          value={progress < 3 ? progress : 4}
          max={4}
        />
        {error && <ModalBody className="text-danger">{error}</ModalBody>}
        <ModalFooter>
          <Button disabled color="primary" onClick={() => setShowModal(false)}>
            Finish
          </Button>{' '}
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default CreateProject;
