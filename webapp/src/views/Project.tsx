import { FC, useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { Route, Routes, useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Network } from '@web3-react/network';

import { getProjectContract } from '../utils/contracts';
import { hooks } from '../connectors/priorityConnector';
import ProjectDashboard from '../components/project/ProjectDashboard';
import CreatePlan from './CreatePlan';
import { getAddChainParameters } from '../utils/chains';

const { usePriorityConnector, usePriorityChainId, usePriorityProvider } = hooks;

const Project: FC = () => {
  const { chain, address } = useParams();
  const connector = usePriorityConnector();
  const chainId = usePriorityChainId();
  const provider = usePriorityProvider();

  // Switch connector to same chain as the project in case of mismatch
  if (chain && chainId && Number(chain) !== chainId) {
    if (connector instanceof Network) {
      connector.activate(Number(chain));
    } else {
      connector.activate(getAddChainParameters(Number(chain)));
    }
  }

  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    let didCancel = false;

    async function getContract() {
      if (provider && address) {
        const c = await getProjectContract(
          address,
          (connector instanceof Network) ? provider : provider.getSigner(),
        );

        if (c && !didCancel) {
          setContract(c);
        }
      }
    }

    getContract();
    return () => {
      didCancel = true;
    };
  }, [chainId, address, provider, connector]);

  if (contract === undefined) {
    return <Spinner className="m-3" />;
  }

  return (
    <Routes>
      <Route index element={<ProjectDashboard contract={contract} />} />
      <Route path="create-plan" element={<CreatePlan contract={contract} />} />
    </Routes>
  );
};

export default Project;
