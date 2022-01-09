/* eslint-disable no-nested-ternary */
import { FC, useState } from 'react';
import { Contract, Signer, providers } from 'ethers';
import {
  Button,
  Row,
  Form,
  FormGroup,
  Input,
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
import { useWeb3React } from '@web3-react/core';
import { Check, Info, Key, Upload } from 'react-feather';
import { Link, useParams } from 'react-router-dom';

import {
  getContractFactory,
  getContractAddress,
  loadContract,
} from '../utils/contracts';
import Breadcrumbs from '../components/dapp/Breadcrumbs';
import CircleIcon from '../components/CircleIcon';
import ChainlinkConfig from '../utils/chainlinkConfig';
import { getPublicKey, PublicKeyType } from '../utils/web3helpers';

async function deployContract(
  publicKey: PublicKeyType,
  contractName: string,
  chainId: number,
  signer: Signer,
): Promise<Contract> {
  if (!(chainId in ChainlinkConfig)) {
    throw Error('Invalid chain id, change connected blockchain');
  }
  const tokenAddress = getContractAddress(chainId, 'FELToken');
  const factory = await getContractFactory(contractName, signer);

  if (!factory) {
    throw Error(
      'Invalid contract type, unable to load contract for deployment.',
    );
  }

  const deployArgs = [
    tokenAddress,
    // Builder setup
    publicKey.parity,
    publicKey.key,
    // Chainlink setup
    ChainlinkConfig[chainId].keyhash,
    ChainlinkConfig[chainId].vrfCoordinator,
    ChainlinkConfig[chainId].linkToken,
    // Chainlink fee:
    ChainlinkConfig[chainId].fee,
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

const predefinedModels = { 'Linear Regression': 'CID' };

interface ProjectDisplayProps {
  contract: Contract;
}

const CreatePlan: FC<ProjectDisplayProps> = ({ contract }) => {
  const { address } = useParams();

  const breadcrumbLinks = [
    {
      link: '..',
      name: 'Project',
    },
    {
      link: '',
      name: 'Create Training Plan',
    },
  ];

  const { chainId, library, account } = useWeb3React();
  const isActive = account && chainId;

  const [modelCID, setModelCID] = useState('');
  const [numRounds, setNumRounds] = useState(0);
  const [reward, setReward] = useState(0);

  const [isSubmitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(3);
  const [error, setError] = useState('');

  return (
    <main>
      <Breadcrumbs title="Create Training Plan" links={breadcrumbLinks} />
      <Row className="px-4 px-sm-5 pb-5 justify-content-center">
        <Card body className="shadow border-0" style={{ maxWidth: '800px' }}>
          <Form>
            <FormGroup>
              <Label for="modelCID">Select model</Label>
              <div className="input-group">
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                  <span className="ms-2">Predefined model:</span>
                </div>

                <Input
                  id="modelCID"
                  name="modelCID"
                  type="select"
                  value={modelCID}
                  onChange={(e) => setModelCID(e.target.value)}
                >
                  <option value="">Select predefined model...</option>
                  {Object.keys(predefinedModels).map((name) => <option key={name} value={name}>{name}</option>)}
                </Input>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="input-group">
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                  <span className="ms-2">Custome model:</span>
                </div>

                <Input
                  id="modelCIDc"
                  name="modelCIDc"
                  type="text"
                  value={modelCID}
                  onChange={(e) => setModelCID(e.target.value)}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="rounds">Number of rounds: <span className="fw-bold">{numRounds}</span></Label>
              <Input
                id="rounds"
                name="rounds"
                type="range"
                min="0"
                max="100"
                value={numRounds}
                onChange={(e) => setNumRounds(parseInt(e.target.value, 10))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="reward">Node reward per round</Label>
              <Input
                id="reward"
                name="reward"
                type="number"
                value={reward}
                required
                invalid={isSubmitted && !reward}
                onChange={(e) => setReward(Math.max(0, parseInt(e.target.value, 10)))}
              />
            </FormGroup>
            <Button disabled={!isActive} color="primary" onClick={() => { console.log('dep'); }}>
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
            animated={!error && progress < 5}
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
          <ModalBody className="text-danger">
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
                      to={`../project/${address}`}
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

export default CreatePlan;
