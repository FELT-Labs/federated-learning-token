/* eslint-disable no-nested-ternary */
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
  Alert,
} from 'reactstrap';
import { Check, Info, Key, Upload } from 'react-feather';
import { Link } from 'react-router-dom';

import { getContractFactory, getContractAddress, loadContract } from '../utils/contracts';
import Breadcrumbs from '../components/dapp/Breadcrumbs';
import CircleIcon from '../components/CircleIcon';
import { encryptSecret, generateRandomSecret, getPublicKey } from '../utils/cryptography';
import { metaMask, hooks } from '../connectors/metaMask';

async function deployContract(
  publicKey: Buffer,
  contractName: string,
  chainId: number,
  signer: Signer,
): Promise<Contract> {
  const tokenAddress = getContractAddress(chainId, 'FELToken');
  const factory = await getContractFactory(contractName, signer);

  if (!factory) {
    throw Error(
      'Invalid contract type, unable to load contract for deployment.',
    );
  }

  const key = generateRandomSecret();
  const ciphertext = encryptSecret(publicKey, key);

  const deployArgs = [
    tokenAddress,
    // Builder setup
    publicKey,
    ciphertext,
  ];
  return factory.deploy(...deployArgs);
}

async function registerContract(
  address: string,
  name: string,
  description: string,
  chainId: number,
  signer: Signer,
): Promise<providers.TransactionResponse> {
  const manager = await loadContract(chainId, 'ProjectManager', signer);
  if (!manager) {
    throw Error('Unable to load Project Manager contract.');
  }
  return manager.activateProject(address, name, description, 0);
}

const breadcrumbLinks = [
  {
    link: '',
    name: 'Create Project',
  },
];

const CreateProject: FC = () => {
  const { useChainId, useProvider, useAccount, useIsActive } = hooks;

  const chainId = useChainId();
  const provider = useProvider();
  const isActive = useIsActive();
  const account = useAccount();

  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState('ProjectContract');
  const [description, setDescription] = useState('');

  const [address, setAddress] = useState('');

  const [isSubmitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const deploy = async () => {
    if (!provider || !metaMask.provider || !account) {
      return;
    }
    setSubmitted(true);
    setProgress(0);
    setAddress('');

    if (!(chainId && name && description)) {
      return;
    }

    setError('');
    setShowModal(true);

    setProgress(2);
    let publicKey;
    try {
      publicKey = await getPublicKey(metaMask.provider, account);
    } catch (e: any) {
      setError(e && e.message ? e.message : 'Unknown error');
      return;
    }

    setProgress(3);
    let contract;
    try {
      contract = await deployContract(
        publicKey,
        projectType,
        chainId,
        provider.getSigner(),
      );
    } catch (e: any) {
      setError(e && e.message ? e.message : 'Unknown error');
      return;
    } finally {
      setProgress(4);
    }

    await contract.deployTransaction.wait();
    setProgress(5);

    setAddress(contract.address);

    let transaction;
    try {
      transaction = await registerContract(
        contract.address,
        name,
        description,
        chainId,
        provider.getSigner(),
      );
    } catch (e: any) {
      setError(e && e.message ? e.message : 'Unknown error');
      return;
    } finally {
      setProgress(6);
    }

    await transaction.wait();
    setProgress(7);
  };

  return (
    <main>
      <Breadcrumbs title="Create Project" links={breadcrumbLinks} />
      <Row className="px-4 px-sm-5 pb-5 justify-content-center">
        {address && progress === 7 && (
          <Alert color="primary d-flex align-items-center text-primary">
            <Info className="me-3" />
            <div>
              Contract was deployed. For more details visit project dashboard:
              <br />
              <Link
                className="alert-link"
                to={`../project/${chainId}/${address}`}
                style={{
                  color: '#374066',
                  borderBottom: '1px dotted rgb(0 0 0 / 50%)',
                }}
              >
                {address}
              </Link>
            </div>
          </Alert>
        )}
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
              <Label for="projectTypeId">Project Type</Label>
              <Input
                id="projectTypeId"
                name="projectType"
                type="select"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="ProjectContract">Basic Project Contract</option>
              </Input>
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
                onChange={(e) => setDescription(e.target.value.substring(0, 127))}
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
        <ModalHeader>
          Deployment {progress < 7 ? 'in Progress' : 'Finished'}
        </ModalHeader>
        <ModalBody>Don&apos;t close this browser tab while running!</ModalBody>
        <div className="d-flex align-items-center m-4 position-relative">
          <Progress
            className="w-100 m-0"
            animated={!error && progress < 7}
            color={error ? 'danger' : 'success'}
            value={progress}
            max={6}
          />
          <CircleIcon
            icon={<Key />}
            color={
              error && progress === 2
                ? 'danger'
                : progress < 3
                  ? 'secondary'
                  : 'success'
            }
            light={progress < 3 && !(error && progress === 2)}
            style={{
              position: 'absolute',
              left: 0,
              right: '33.33%',
              margin: '0 auto',
            }}
          />
          <CircleIcon
            icon={<Upload />}
            color={
              error && progress === 4
                ? 'danger'
                : progress < 5
                  ? 'secondary'
                  : 'success'
            }
            light={progress < 5 && !(error && progress === 4)}
            style={{
              position: 'absolute',
              left: '33.33%',
              right: 0,
              margin: '0 auto',
            }}
          />
          <CircleIcon
            icon={<Check />}
            color={
              error && progress === 6
                ? 'danger'
                : progress < 7
                  ? 'secondary'
                  : 'success'
            }
            light={progress < 7 && !(error && progress === 7)}
            style={{ position: 'absolute', right: 0 }}
          />
        </div>
        <div>
          <ModalBody className="text-danger text-break">
            {error && (
              <>
                <span className="fw-bold">Error: </span>
                {error}
              </>
            )}
            {address && (
              <Alert color="primary d-flex align-items-center text-primary">
                <Info className="me-3" />
                <div>
                  Deployed contract address:{' '}
                  {progress < 7 ? (
                    <span>{address}</span>
                  ) : (
                    <Link
                      className="alert-link"
                      to={`../project/${chainId}/${address}`}
                      style={{
                        color: '#374066',
                        borderBottom: '1px dotted rgb(0 0 0 / 50%)',
                      }}
                    >
                      {address}
                    </Link>
                  )}
                </div>
              </Alert>
            )}
          </ModalBody>
        </div>
        <ModalFooter>
          <Button
            disabled={progress < 7}
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
