/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { FC, ReactNode, useEffect, useState, useCallback } from 'react';
import { constants, Contract } from 'ethers';
import { Button, Card, CardTitle, FormGroup, FormText, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row } from 'reactstrap';
import { Check, Clock, Copy, Key, Upload, XCircle } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { metaMask, hooks } from '../../connectors/metaMask';
import { getPublicKey } from '../../utils/cryptography';
import CircleIcon from '../CircleIcon';

interface RoleBadgeProps {
    text: string | ReactNode;
}

const RoleBadge: FC<RoleBadgeProps> = ({ text }) => (
  <Button
    size="sm"
    color="secondary"
    className="mt-1 rounded-pill d-flex align-items-center cursor-default"
    style={{ width: 'fit-content' }}
  >
    {text}
  </Button>
);

interface BuilderDescriptionProps {
  contract: Contract;
  isBuilder: boolean;
}

const BuilderDescription: FC<BuilderDescriptionProps> = ({ contract, isBuilder }) => {
  const [showModal, setShowModal] = useState(false);
  const [requestedAccess, setRequestedAccess] = useState(false);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const { useChainId, useProvider, useIsActive, useAccount } = hooks;
  const chainId = useChainId();
  const provider = useProvider();
  const isActive = useIsActive();
  const account = useAccount();

  const fetchRequestState = useCallback(async () => {
    const request = await contract.builderRequests(account);
    setRequestedAccess(request.builderAddress !== constants.AddressZero);
  }, [contract, account]);

  useEffect(() => {
    if (account) {
      fetchRequestState();
    }
  }, [fetchRequestState, account]);

  const requestAccess = async () => {
    setProgress(0);
    setError('');

    if (!isBuilder && provider && metaMask.provider && chainId && account) {
      setShowModal(true);
      setProgress(2);

      let publicKey;
      try {
        publicKey = await getPublicKey(metaMask.provider, account);
      } catch (e: any) {
        setError(e && (e.message || 'Unknown error'));
        return;
      }

      setProgress(4);

      try {
        const tx = await contract.requestJoinBuilder(publicKey);
        await tx.wait();
      } catch (e: any) {
        setError(e && (e.message || 'Unknown error'));
        return;
      }
      setProgress(7);

      fetchRequestState();
    }
  };

  return (
    <>
      <p className="line-header fw-bold mb-1 mt-4"><span>Builder</span></p>
      {isBuilder ? (
        <>
          <p>You can create models (training plans) and train them on this project.</p>
          <Button color="secondary" to="create-plan" tag={Link}>
            Create Model
          </Button>
        </>
      ) : (
        <>
          <p>Send request to become a builder and be able to train models on this project.</p>
          <Button color="secondary" onClick={requestAccess} disabled={!isActive || requestedAccess}>
            {requestedAccess ? 'Access already requested' : 'Request Access'}
          </Button>
        </>
      )}

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
    </>
  );
};

interface DataProviderProps {
  nodeState: number;
  nodeActive?: boolean;
}

const DataProviderDescription: FC<DataProviderProps> = ({ nodeState, nodeActive = false }) => {
  // TODO: Check if data provider is active
  const { chain, address } = useParams();
  const command = `felt-node-worker --chain ${chain} --contract ${address} --account main --data example_data.csv`;

  const noRequest = nodeState === 0;
  const waiting = nodeState === 1;
  const declined = nodeState === 2;
  const accepted = nodeState >= 3;

  return (
    <>
      <p className="line-header fw-bold mb-1 mt-4">
        <span>
          Data Provider
          {waiting && <Clock size={20} className="ms-2" />}
          {declined && <XCircle size={20} className="ms-2" />}
        </span>
      </p>
      {noRequest && <p>Send request to become a data provider.</p>}
      {waiting && <p>You need to wait for your request to be processed.</p>}
      {declined && <p>Your request was declined. You can&apos;t participate in this project.</p>}
      {accepted && <p>You can provide training data. Pause your participation if inactive.</p>}

      {(accepted || waiting) && (
      <FormGroup>
        <InputGroup size="sm">
          <InputGroupText className="form-control user-select-all overflow-hidden">
            {command}
          </InputGroupText>
          <Button
            color="default"
            onClick={() => navigator.clipboard.writeText(command)}
          >
            <Copy size={20} />
          </Button>
        </InputGroup>
        <FormText color="white">
          Command to activate + run data provider client.
        </FormText>
      </FormGroup>
      )}

      {/* Activation is done automatically using client script */}
      {accepted && nodeActive && (
        <Button color="secondary">
          Deactivate
        </Button>
      )}

      {noRequest && (
        <Button color="secondary">
          Request Access
        </Button>
      )}
    </>
  );
};

interface ProjectRolesProps {
  contract: Contract;
  builder: any;
  nodeState: number | undefined;
  nodeActive: boolean | undefined;
}

const ProjectRoles: FC<ProjectRolesProps> = ({ contract, builder, nodeState, nodeActive }) => {
  if (builder === undefined || nodeState === undefined) {
    return (
      <Card inverse body className="shadow" style={{ color: '#fff', backgroundColor: '#7386d5' }}>
        <CardTitle tag="h3" style={{ color: '#fff' }}>
          Role
        </CardTitle>
        <Row className="ps-1">
          <RoleBadge text="Viewer" />
        </Row>
        <p className="mb-1 mt-4">Connect to MetaMask in order to interact with the project.</p>
      </Card>
    );
  }

  return (
    <Card inverse body className="shadow" style={{ color: '#fff', backgroundColor: '#7386d5' }}>
      <CardTitle
        tag="h3"
        style={{ color: '#fff' }}
      >
        Role
      </CardTitle>
      <Row className="ps-1">
        {builder._address === constants.AddressZero && nodeState === 0 && <RoleBadge text="Viewer" />}
        {builder._address !== constants.AddressZero && <RoleBadge text="Builder" />}
        {nodeState === 1 && <RoleBadge text={<><Clock size={18} /><span> Data Provider</span></>} />}
        {nodeState === 2 && <RoleBadge text={<><XCircle size={18} /><span> Data Provider</span></>} />}
        {nodeState >= 3 && <RoleBadge text="Data Provider" />}
      </Row>
      <BuilderDescription contract={contract} isBuilder={builder._address !== constants.AddressZero} />
      <DataProviderDescription nodeState={nodeState} nodeActive={nodeActive} />
    </Card>
  );
};

export default ProjectRoles;
