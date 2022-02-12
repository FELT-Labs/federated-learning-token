/* eslint-disable no-underscore-dangle */
import { FC, ReactNode } from 'react';
import { constants } from 'ethers';
import { Button, Card, CardTitle, FormGroup, FormText, InputGroup, InputGroupText, Row } from 'reactstrap';
import { Clock, Copy, XCircle } from 'react-feather';
import { Link, useParams } from 'react-router-dom';

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
  isBuilder: boolean;
}

const BuilderDescription: FC<BuilderDescriptionProps> = ({ isBuilder }) => (
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
        <Button color="secondary" to="create-plan" tag={Link}>
          Request Access
        </Button>
      </>
    )}
  </>
);

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
  builder: any;
  nodeState: number | undefined;
  nodeActive: boolean | undefined;
}

const ProjectRoles: FC<ProjectRolesProps> = ({ builder, nodeState, nodeActive }) => {
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
      <BuilderDescription isBuilder={builder._address !== constants.AddressZero} />
      <DataProviderDescription nodeState={nodeState} nodeActive={nodeActive} />
    </Card>
  );
};

export default ProjectRoles;
