import { FC, useState } from 'react';
import { Contract, Signer, providers } from 'ethers';
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
import { Check, Upload } from 'react-feather';

import {
  getContractFactory,
  getContractAddress,
  loadContract,
} from '../utils/contracts';
import Breadcrumbs from '../components/dapp/Breadcrumbs';
import CircleIcon from '../components/CircleIcon';

async function deployContract(
  name: string,
  description: string,
  chainId: number,
  signer: Signer,
): Promise<undefined | Contract> {
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

  if (factory) {
    return factory.deploy(...deployArgs);
  }

  return undefined;
}

async function registerContract(
  name: string,
  description: string,
  chainId: number,
  signer: Signer,
): Promise<undefined | providers.TransactionResponse> {
  const address = await signer.getAddress();
  const manager = await loadContract(chainId, 'ProjectManager', signer);
  if (manager) {
    return manager.activateProject(address, name, description, 0);
  }
  return undefined;
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

  const [isSubmitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(3);
  const [error, setError] = useState('');

  const deploy = async () => {
    setSubmitted(true);
    if (chainId && name && description) {
      setShowModal(true);
      setProgress(1);
      const contract = await deployContract(
        name,
        description,
        chainId,
        library.getSigner(),
      );
      setProgress(2);
      if (contract) {
        await contract.deployTransaction.wait();
        setProgress(3);
        const transaction = await registerContract(
          name,
          description,
          chainId,
          library.getSigner(),
        );
        setProgress(4);

        if (transaction) {
          await transaction.wait();
          setProgress(5);
        }
      }
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
                required
                invalid={isSubmitted && !name.length}
                onChange={(e) => setName(e.target.value.substring(0, 63))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                id="description"
                name="text"
                type="textarea"
                value={description}
                required
                invalid={isSubmitted && !description.length}
                onChange={(e) =>
                  setDescription(e.target.value.substring(0, 127))
                }
              />
              <FormText>Characters left: {127 - description.length}</FormText>
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
        <div className="d-flex align-items-center">
          <Progress
            className="w-100 m-0"
            animated
            color="success"
            value={progress}
            max={4}
          />
          <CircleIcon
            icon={<Upload />}
            color={progress < 3 ? 'secondary' : 'success'}
            light={progress < 3}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
            }}
          />
          <CircleIcon
            icon={<Check />}
            color={progress < 5 ? 'secondary' : 'success'}
            light={progress < 5}
            style={{ position: 'absolute', right: 0 }}
          />
        </div>
        <div>
          {error && <ModalBody className="text-danger">{error}</ModalBody>}
        </div>
        <ModalFooter>
          <Button
            disabled={progress < 5}
            color="primary"
            onClick={() => setShowModal(false)}
          >
            Finish
          </Button>{' '}
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default CreateProject;
