import { Contract } from 'ethers';
import { FC, useEffect, useState } from 'react';
import { CheckCircle, Download, RefreshCw } from 'react-feather';
import { Button, Card, CardBody, CardTitle, Col, Progress, Row, Table } from 'reactstrap';

import { TPlan } from '../../utils/contractTypes';
import { getNameOfCID } from '../../utils/models';
import { metaMask } from '../../connectors/metaMask';
import { downloadModel } from '../../utils/ipfs';
import Alert from '../Alert';

const formatAddress = (a: string) => `${a.substring(0, 6)}...${a.substring(a.length - 4)}`;

interface AllPlansProps {
  download: (a: string) => void;
  account: string | undefined;
  contract: Contract;
  numPlans: number;
}

const AllPlans: FC<AllPlansProps> = ({ download, account, contract, numPlans }) => {
  const [plans, setPlans] = useState<TPlan[]>([]);
  const { provider } = metaMask;

  // TODO: Pagination of plans or something like that
  //       Right now it loads only 10 latest plans
  // TODO: Plan details
  const start = numPlans - 1;

  useEffect(() => {
    setPlans([]);

    const fetchPlans = async () => {
      // Number of plans to display
      const num = Math.min(10, start + 1);
      setPlans(await Promise.all(
        Array(num).fill(1).map((_, i) => contract.plans(start - i)),
      ));
    };

    if (contract && numPlans) {
      fetchPlans();
    }
  }, [contract, start, numPlans]);

  return (
    <Row className="gt-2 mt-3">
      <Col>
        <Card className="shadow">
          <CardBody className="pb-0">
            <CardTitle tag="h3">
              All Plans
            </CardTitle>
          </CardBody>
          <Table
            hover
            responsive
          >
            <thead>
              <tr>
                <th className="ps-5">
                  #
                </th>
                <th>
                  Model
                </th>
                <th className="text-center">
                  Rounds
                </th>
                <th className="text-center pe-5">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, idx) => (
                <tr key={plan.finalModelCID}>
                  <th className="ps-5 align-middle" scope="row">
                    {start - idx}
                  </th>
                  <td className="align-middle">
                    {getNameOfCID(plan.baseModelCID)}
                  </td>
                  <td className="text-center align-middle">
                    {plan.numRounds}
                  </td>
                  <td className="text-center align-middle pe-5">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {(provider && plan.finalModelCID && account === plan.creator)
                      ? (
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="primary"
                          size="sm"
                          style={{ width: '1.8rem', height: '1.8rem' }}
                          onClick={async () => download(plan.finalModelCID)}
                        >
                          <Download size={19} />
                        </Button>
                      ) : (plan.finalModelCID ? <CheckCircle size={20} /> : <RefreshCw size={20} />)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  );
};

interface ProjectPlansProps {
  account: string | undefined;
  contract: Contract;
  isRunning: boolean;
  currentRound: number;
  numPlans: number;
  plan: TPlan | undefined
}

const ProjectPlans: FC<ProjectPlansProps> = ({ account, contract, isRunning, currentRound, numPlans, plan }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIsError, setAlertIsError] = useState(false);
  const { provider } = metaMask;

  const download = async (cid: string) => {
    if (provider !== undefined && account) {
      try {
        await downloadModel(provider, account, cid);
        setAlertIsError(false);
        setAlertMessage("You downloaded model file 'model.joblib' read documentation for more details.");
      } catch (err) {
        setAlertIsError(true);
        setAlertMessage(String(err));
      }
    } else {
      setAlertIsError(true);
      setAlertMessage('Provider is undefined. Make sure you are connected to MetaMask.');
    }
  };

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
                  <small>Creator: {formatAddress(plan.creator)} {account === plan.creator && '(You)'}</small> <br />
                </p>
              </CardTitle>
              <div>
                <h3 className="text-primary">{isRunning ? 'Running' : 'Finished'}</h3>
                { (provider && account && account === plan.creator && plan.finalModelCID)
                && (
                <Button
                  className="w-100"
                  color="primary"
                  size="sm"
                  onClick={async () => download(plan.finalModelCID)}
                >
                  Download
                </Button>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="text-center flex-fill border-end">
                <h5 className="mb-0">{getNameOfCID(plan.baseModelCID)}</h5>
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
              animated={isRunning}
              value={isRunning ? currentRound : plan.numRounds}
              max={plan.numRounds}
            />
          </Card>
        </Col>
      </Row>
      {alertMessage && <Alert isOpen error={alertIsError}>{alertMessage}</Alert>}
      <AllPlans download={download} account={account} contract={contract} numPlans={numPlans} />
    </>
  );
};

export default ProjectPlans;
