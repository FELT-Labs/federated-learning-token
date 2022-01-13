import { FC, useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { getProjectContract } from '../utils/contracts';
import ProjectSummary from '../components/project/ProjectSummary';
import ProjectPlans from '../components/project/ProjectPlans';
import Breadcrumbs from '../components/dapp/Breadcrumbs';
import CreatePlan from './CreatePlan';

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

  const breadcrumbLinks = [
    {
      link: '',
      name: 'Project',
    },
  ];

  if (contract === undefined) {
    return <Spinner className="m-3" />;
  }

  return (
    <Routes>
      <Route
        index
        element={(
          <>
            <Row className="m-0">
              <Breadcrumbs title="Project" links={breadcrumbLinks} />
              <Col className="d-flex align-items-center">
                <Button color="default" outline to="create-plan" tag={Link}>
                  Create Training Plan
                </Button>
              </Col>
            </Row>
            <ProjectSummary contract={contract} />
            <ProjectPlans contract={contract} />
          </>
      )}
      />
      <Route path="create-plan" element={<CreatePlan contract={contract} />} />
    </Routes>
  );
};

export default Project;
