import { FC, useState, useEffect } from 'react';
import { BigNumber, Contract } from 'ethers';
import { Container, Row, Spinner } from 'reactstrap';
import Card from '../Card';

interface IPlan {
  numRounds: number;
  numNodes: BigNumber;
  totalReward: BigNumber;
  nodeReward: BigNumber;
  creator: string;
}

interface ProjectPlansProps {
  contract: Contract;
}

// TODO show other plans
const ProjectPlans: FC<ProjectPlansProps> = ({ contract }) => {
  const [numPlans, setNumPlans] = useState(-1);
  const [plan, setPlan] = useState<IPlan>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const n = await contract.numPlans();
        setNumPlans(n);
        if (n > 0) {
          const p = await contract.plans(0);
          setPlan(p);
        }
      } catch (e) {
        console.log(e);

        setNumPlans(-1);
        setPlan(undefined);
      }
    };

    fetchData();
  }, [contract]);

  if (plan === undefined) return <Spinner />;

  return (
    <Container>
      <h3>Plan #{numPlans - 1}</h3>
      <p>Plan Creator: {plan.creator}</p>
      <Row>
        <Card title="Number of rounds" text={plan.numRounds.toString()} />
        <Card title="Number of nodes" text={plan.numNodes.toString()} />
        <Card title="Node reward" text={plan.nodeReward.toString()} />
      </Row>
    </Container>
  );
};

export default ProjectPlans;
