import { FC, useEffect, useState } from 'react';
import { BigNumber, Contract } from 'ethers';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import ProjectSummary from './ProjectSummary';
import ProjectPlans from './ProjectPlans';
import Breadcrumbs from '../dapp/Breadcrumbs';
import ErrorAlert from '../ErrorAlert';
import { hooks } from '../../connectors/metaMask';
import ProjectRoles from './ProjectRoles';

export type IPlan = {
  numRounds: number;
  numNodes: BigNumber;
  totalReward: BigNumber;
  nodeReward: BigNumber;
  creator: string;
}

interface ProjectDashboardProps {
    contract: Contract;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({ contract }) => {
  const { useAccount } = hooks;
  const account = useAccount();

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
  const [isRunning, setIsRunning] = useState(false);
  const [plan, setPlan] = useState<IPlan>();
  const [builder, setBuilder] = useState<any>();
  const [nodeState, setNodeState] = useState<number>();

  useEffect(() => {
    setBuilder(undefined);
    setNodeState(undefined);

    const fetchRoles = async () => {
      try {
        const [b, n] = await Promise.all([
          contract.builders(account),
          contract.nodeState(account),
        ]);
        setBuilder(b);
        setNodeState(n.toNumber());
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
        const [plans, nodes, activeNodes, planRunning] = await Promise.all([
          contract.numPlans(),
          contract.getNodesLength(),
          contract.activeNodes(),
          contract.isPlanRunning(),
        ]);
        if (plans > 0) {
          const mostRecentPlan = await contract.plans(plans - 1);
          setPlan(mostRecentPlan);
        }
        setNumPlans(plans);
        setNumNodes(nodes.toNumber());
        setNumActiveNodes(activeNodes);
        setIsRunning(planRunning);

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
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs title="Project" links={breadcrumbLinks} />
        <Button color="default" outline to="create-plan" tag={Link} style={{ marginRight: 40 }} disabled={error !== undefined}>
          Create Training Plan
        </Button>
      </div>

      { error === undefined && !loading && (
        <>
          <ProjectRoles builder={builder} nodeState={nodeState} />
          <ProjectSummary
            numPlans={numPlans}
            numActiveNodes={numActiveNodes}
            numNodes={numNodes}
            isRunning={isRunning}
          />
          <ProjectPlans numPlans={numPlans} plan={plan} />
        </>
      )}

      {loading && <Spinner />}

      {error && <ErrorAlert isOpen>{error}</ErrorAlert>}
    </main>
  );
};

export default ProjectDashboard;
