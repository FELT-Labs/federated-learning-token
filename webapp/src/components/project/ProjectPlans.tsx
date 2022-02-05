import { FC } from 'react';
import { Card, CardTitle, Col, Progress, Row } from 'reactstrap';
import { TPlan } from '../../utils/contractTypes';

const formatAddress = (a: string) => `${a.substring(0, 6)}...${a.substring(a.length - 4)}`;

interface ProjectPlansProps {
  isRunning: boolean;
  currentRound: number;
  numPlans: number;
  plan: TPlan | undefined
}

const AllPlans: FC = () => (
  <Row className="gt-2 mt-3">
    <Col>
      <Card body className="shadow">
        <CardTitle tag="h3">
          All Plans
        </CardTitle>
        <h5 className="text-muted">
          TODO: list
        </h5>
      </Card>
    </Col>
  </Row>
);

// TODO show other plans not just most recent one
// TODO: Add model type + link to final model
const ProjectPlans: FC<ProjectPlansProps> = ({ isRunning, currentRound, numPlans, plan }) => {
  if (plan === undefined) {
    return (
      <Row className="gt-2 mt-3">
        <Col>
          <Card body className="shadow">
            <CardTitle tag="h3">
              Plan X
            </CardTitle>
            <h5 className="text-muted">
              There are no training plans in this project yet.
            </h5>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row className="gt-2 mt-3">
        <Col>
          <Card body className="shadow">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <CardTitle className="mb-0">
                <h3 className="mb-0">
                  Plan {numPlans - 1}
                </h3>
                <p className="mb-0 text-muted">
                  <small>Creator: {formatAddress(plan.creator)}</small>
                </p>
              </CardTitle>
              <h3 className="text-primary">{isRunning ? 'Running' : 'Finished'}</h3>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="text-center flex-fill border-end">
                <h5 className="mb-0">Linear Regression</h5>
                <p className="mb-0 text-muted">Model</p>
              </div>
              <div className="text-center flex-fill border-end">
                <h5 className="mb-0">{plan.numNodes.toString()}</h5>
                <p className="mb-0 text-muted">Nodes</p>
              </div>
              <div className="text-center flex-fill">
                <h5 className="mb-0">{plan.nodeReward.toString()}</h5>
                <p className="mb-0 text-muted">Reward</p>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-between align-items-center">
              <h5 className="text-muted">Round</h5>
              <h5>{currentRound} <span>/ {plan.numRounds}</span></h5>
            </div>
            <Progress
              color="default"
              animated
              value={isRunning ? currentRound : plan.numRounds}
              max={plan.numRounds}
            />
          </Card>
        </Col>
      </Row>
      <AllPlans />
    </>
  );
};

export default ProjectPlans;
