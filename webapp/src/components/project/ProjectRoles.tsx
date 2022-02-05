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

const BuilderDescription: FC = () => (
  <>
    <p className="line-header fw-bold mb-1 mt-4"><span>Builder</span></p>
    <p>You can create models (training plans) and train them on this project.</p>
    <Button color="secondary" to="create-plan" tag={Link}>
      Create Model
    </Button>
  </>
);

interface DataProviderProps {
  waiting?: boolean;
  declined?: boolean;
  nodeActive?: boolean;
}

const DataProviderDescription: FC<DataProviderProps> = ({ waiting = false, declined = false, nodeActive = false }) => {
  // TODO: Check if data provider is active
  const { chain, address } = useParams();
  const command = `felt-node-worker --chain ${chain} --contract ${address} --account main --data example_data.csv`;

  const full = !waiting && !declined;

  return (
    <>
      <p className="line-header fw-bold mb-1 mt-4">
        <span>
          Provider
          {waiting && <Clock size={20} className="ms-2" />}
          {declined && <XCircle size={20} className="ms-2" />}
        </span>
      </p>
      {waiting && <p>You need to wait for your request to be processed.</p>}
      {declined && <p>Your request was declined. You can&apos;t participate in this project.</p>}
      {full && <p>You can provide training data. Pause your participation if inactive.</p>}

      {(full || waiting) && (
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
      {full && nodeActive && (
        <Button color="secondary">
          Deactivate
        </Button>
      )}
    </>
  );
};

interface ProjectRolesProps {
    builder: any
    nodeState: number | undefined;
    nodeActive: boolean | undefined;
}

const ProjectRoles: FC<ProjectRolesProps> = ({ builder, nodeState, nodeActive }) => {
  if (builder === undefined || nodeState === undefined) {
    return null;
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
      {builder._address !== constants.AddressZero && <BuilderDescription />}
      {nodeState >= 3 && <DataProviderDescription nodeActive={nodeActive} />}
    </Card>
  );
};

export default ProjectRoles;
