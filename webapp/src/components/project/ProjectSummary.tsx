import { FC, useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { Container, Col, Row, Card, CardTitle } from 'reactstrap';
import { AlertCircle, Cpu, Database } from 'react-feather';
import Breadcrumbs from '../dapp/Breadcrumbs';
import CircleIcon from '../CircleIcon';

interface ProjectDisplayProps {
  contract: Contract;
}

const ProjectSummary: FC<ProjectDisplayProps> = ({ contract }) => {
  const [numPlans, setNumPlans] = useState(-1);
  const [numNodes, setNumNodes] = useState(-1);
  const [numActiveNodes, setNumActiveNodes] = useState(-1);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plans, nodes, activeNodes, planRunning] = await Promise.all([
          contract.numPlans(),
          contract.getNodesLength(),
          contract.activeNodes(),
          contract.isPlanRunning(),
        ]);
        setNumPlans(plans);
        setNumNodes(nodes.toNumber());
        setNumActiveNodes(activeNodes);
        setRunning(planRunning);
      } catch (e) {
        setNumPlans(-1);
        setNumNodes(-1);
        setNumActiveNodes(-1);
        setRunning(false);
      }
    };

    fetchData();
  }, [contract]);

  const breadcrumbLinks = [
    {
      link: '',
      name: 'Project',
    },
  ];

  return (
    <main>
      <Breadcrumbs title="Project" links={breadcrumbLinks} />
      <Container
        fluid
        className="p-5 py-4"
        style={{ background: 'linear-gradient(135deg, #4FABCE, #4347BA)' }}
      >
        <Row md="3" xs="2">
          <Col>
            <Card body className="shadow">
              <CardTitle
                className="text-uppercase text-muted"
                style={{ fontSize: '0.8rem' }}
              >
                Active data providers
              </CardTitle>
              <Row className="align-items-center mx-3">
                <Col className="d-flex justify-content-center">
                  <h2 className="text-success m-0">
                    {numActiveNodes}
                    <span className="text-muted"> / {numNodes}</span>
                  </h2>
                </Col>

                <Col className="d-flex justify-content-center">
                  <CircleIcon icon={<Database />} color="success" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card body className="shadow">
              <CardTitle
                className="text-uppercase text-muted"
                style={{ fontSize: '0.8rem' }}
              >
                Number of training plans
              </CardTitle>
              <Row className="align-items-center mx-3">
                <Col className="d-flex justify-content-center">
                  <h2 className="text-warning m-0">{numPlans}</h2>
                </Col>

                <Col className="d-flex justify-content-center">
                  <CircleIcon icon={<Cpu />} color="warning" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card body className="shadow">
              <CardTitle
                className="text-uppercase text-muted"
                style={{ fontSize: '0.8rem' }}
              >
                Status
              </CardTitle>
              <Row className="align-items-center mx-3">
                <Col className="d-flex justify-content-center">
                  <h2 className="text-info m-0">
                    {isRunning ? 'Busy' : 'Idle'}
                  </h2>
                </Col>

                <Col className="d-flex justify-content-center">
                  <CircleIcon icon={<AlertCircle />} color="info" />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ProjectSummary;