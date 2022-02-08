import { FC } from 'react';
import { Col, Row, Card, CardText } from 'reactstrap';
import { AlertCircle, Cpu, Database } from 'react-feather';
import CircleIcon from '../CircleIcon';

interface ProjectDisplayProps {
  numPlans: number;
  numNodes: number;
  numActiveNodes: number;
  isRunning: boolean;
}

const ProjectSummary: FC<ProjectDisplayProps> = ({ numPlans, numNodes, numActiveNodes, isRunning }) => (
  <Row md="3" xs="2" className="d-flex align-items-stretch g-2">
    <Col>
      <Card body className="shadow h-100">
        <Row className="align-items-center g-0">
          <Col>
            <CircleIcon icon={<Database />} color="default" />
          </Col>
          <Col className="d-flex justify-content-center">
            <h2 className="text-default m-0">
              {numActiveNodes}
              <span className="text-muted"> / {numNodes}</span>
            </h2>
          </Col>
        </Row>
        <CardText className="text-muted mt-2">
          Active data providers
        </CardText>
      </Card>
    </Col>
    <Col>
      <Card body className="shadow h-100">
        <Row className="align-items-center g-0">
          <Col>
            <CircleIcon icon={<Cpu />} color="default" />
          </Col>
          <Col className="d-flex justify-content-center">
            <h2 className="text-default m-0">{numPlans}</h2>
          </Col>
        </Row>
        <CardText className="text-muted mt-2">
          Training plans
        </CardText>
      </Card>
    </Col>
    <Col>
      <Card body className="shadow h-100">
        <Row className="align-items-center g-0">
          <Col>
            <CircleIcon icon={<AlertCircle />} color="default" />
          </Col>
          <Col className="d-flex justify-content-center">
            <h2 className="text-default m-0">
              {isRunning ? 'Busy' : 'Idle'}
            </h2>
          </Col>
        </Row>
        <CardText className="text-muted mt-2">
          Status
        </CardText>
      </Card>
    </Col>
  </Row>
);

export default ProjectSummary;
