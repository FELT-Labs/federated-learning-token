import { FC, useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import {
  Container,
  Col,
  Row,
  Card,
  Spinner,
  CardTitle,
  Button,
} from 'reactstrap';
import { AlertCircle, Cpu, Database } from 'react-feather';

import { getProjectContract } from '../utils/contracts';

interface ContractProps {
  contract: Contract;
}

const ContractDisplay: FC<ContractProps> = ({ contract }) => {
  const [numPlans, setNumPlans] = useState(-1);
  const [numNodes, setNumNodes] = useState(-1);
  const [numActiveNodes, setNumActiveNodes] = useState(-1);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react/destructuring-assignment
      try {
        let r = await contract.numPlans();
        setNumPlans(r);
        r = await contract.getNodesLength();
        setNumNodes(r.toNumber());
        r = await contract.activeNodes();
        setNumActiveNodes(r);
        r = await contract.isPlanRunning();
        setRunning(r);
      } catch (e) {
        setNumPlans(-1);
        setNumNodes(-1);
        setNumActiveNodes(-1);
        setRunning(false);
      }
    };

    fetchData();
  }, [contract]);

  return (
    <Container
      fluid
      className="p-5 py-4"
      style={{
        background: 'linear-gradient(135deg, #4FABCE, #4347BA)',
      }}
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
                <Button
                  className="btn-icon-only rounded-circle ml-1 cursor-default"
                  color="success"
                >
                  <span className="btn-inner--icon text-white">
                    <Database />
                  </span>
                </Button>
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
                <Button
                  className="btn-icon-only rounded-circle ml-1 cursor-default"
                  color="warning"
                >
                  <span className="btn-inner--icon text-white">
                    <Cpu />
                  </span>
                </Button>
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
                <h2 className="text-info m-0">{isRunning ? 'Busy' : 'Idle'}</h2>
              </Col>

              <Col className="d-flex justify-content-center">
                <Button
                  className="btn-icon-only rounded-circle ml-1 cursor-default"
                  color="info"
                >
                  <span className="btn-inner--icon text-white">
                    <AlertCircle />
                  </span>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const Project: FC = () => {
  const { address } = useParams();
  const [contract, setContract] = useState<Contract>();

  const { library, chainId } = useWeb3React();

  useEffect(() => {
    let didCancel = false;

    async function getContract() {
      if (library && address) {
        const c = await getProjectContract(address, library.getSigner());

        if (c && !didCancel) {
          setContract(c);
        }
      }
    }

    getContract();
    return () => {
      didCancel = true;
    };
  }, [library, chainId, address]);

  return (
    <div>
      <h2>{address}</h2>
      {contract ? <ContractDisplay {...{ contract }} /> : <Spinner />}
    </div>
  );
};

export default Project;
