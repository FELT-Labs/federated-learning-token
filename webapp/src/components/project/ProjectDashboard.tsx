/* eslint-disable no-underscore-dangle */
import { FC, useEffect, useState } from 'react';
import { constants, Contract } from 'ethers';
import { Col, Row, Spinner } from 'reactstrap';
import ProjectSummary from './ProjectSummary';
import ProjectPlans from './ProjectPlans';
import Breadcrumbs from '../dapp/Breadcrumbs';
import Alert from '../Alert';
import { hooks } from '../../connectors/priorityConnector';
import ProjectRoles from './ProjectRoles';
import { TPlan, Node } from '../../utils/contractTypes';
import BuilderRequests from './BuilderRequests';
import DataProviderRequests from './DataProviderRequests';

const { usePriorityAccount } = hooks;

interface ProjectDashboardProps {
    contract: Contract;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({ contract }) => {
  const account = usePriorityAccount();

  const breadcrumbLinks = [
    {
      link: '',
      name: 'Project',
    },
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const [numPlans, setNumPlans] = useState(-1);
  const [numNodes, setNumNodes] = useState(-1);
  const [numActiveNodes, setNumActiveNodes] = useState(-1);
  const [currentRound, setCurrentRound] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [plan, setPlan] = useState<TPlan>();
  const [builder, setBuilder] = useState<any>();
  const [nodeState, setNodeState] = useState<number>();
  const [node, setNode] = useState<Node>();

  useEffect(() => {
    setBuilder(undefined);
    setNodeState(undefined);
    setNode(undefined);

    const fetchRoles = async () => {
      try {
        const [b, n] = await Promise.all([
          contract.builders(account),
          contract.nodeState(account),
        ]);
        setBuilder(b);
        setNodeState(n.toNumber());

        if (n.toNumber() >= 3) {
          setNode(await contract.nodesArray(n.toNumber() - 3));
        }
      } catch (err) {
        setError(String(err));
      }
    };
    if (account) {
      fetchRoles();
    }
  }, [account, contract]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const [plans, nodes, activeNodes, planRunning, round] = await Promise.all([
          contract.numPlans(),
          contract.getNodesLength(),
          contract.activeNodes(),
          contract.isPlanRunning(),
          contract.currentRound(),
        ]);
        if (plans > 0) {
          const mostRecentPlan = await contract.plans(plans - 1);
          setPlan(mostRecentPlan);
        }
        setNumPlans(plans);
        setNumNodes(nodes.toNumber());
        setNumActiveNodes(activeNodes);
        setIsRunning(planRunning);
        setCurrentRound(round);

        setLoading(false);
        setError(undefined);
      } catch (err) {
        setLoading(false);
        setError(String(err));
      }
    };

    fetchData();
  }, [contract]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs title="Project" links={breadcrumbLinks} />
      </div>

      { error === undefined && !loading && (
      <Row className="g-3">
        <Col md="4">
          <ProjectRoles
            contract={contract}
            builder={builder}
            nodeState={nodeState}
            nodeActive={node?.activated}
          />
        </Col>
        <Col md="8">
          <ProjectSummary
            numPlans={numPlans}
            numActiveNodes={numActiveNodes}
            numNodes={numNodes}
            isRunning={isRunning}
          />
          <ProjectPlans
            account={account}
            contract={contract}
            isRunning={isRunning}
            currentRound={currentRound}
            numPlans={numPlans}
            plan={plan}
          />
          {builder && builder._address !== constants.AddressZero && (
            <BuilderRequests
              contract={contract}
            />
          )}
          {builder && builder._address !== constants.AddressZero && (
            <DataProviderRequests
              contract={contract}
            />
          )}
        </Col>
      </Row>
      )}

      {loading && <Spinner />}

      {error && <Alert isOpen>{error}</Alert>}
    </>
  );
};

export default ProjectDashboard;
