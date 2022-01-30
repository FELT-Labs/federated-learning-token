import { FC } from 'react';
import { Container, Row } from 'reactstrap';
import Card from '../Card';
import { IPlan } from './ProjectDashboard';

interface ProjectPlansProps {
  numPlans: number;
  plan: IPlan | undefined
}

// TODO show other plans not just most recent one
const ProjectPlans: FC<ProjectPlansProps> = ({ numPlans, plan }) => {
  if (plan === undefined) return null; // there is no training plan yet

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
