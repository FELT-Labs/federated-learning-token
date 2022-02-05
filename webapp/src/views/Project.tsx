import { FC, useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { Route, Routes, useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { getProjectContract } from '../utils/contracts';
import { hooks } from '../connectors/metaMask';
import ProjectDashboard from '../components/project/ProjectDashboard';
import CreatePlan from './CreatePlan';

const Project: FC = () => {
  // TODO: Use chain to check if it is connected to correct network
  const { address } = useParams();
  const { useChainId, useProvider } = hooks;
  const chainId = useChainId();
  const provider = useProvider();

  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    let didCancel = false;

    async function getContract() {
      if (provider && address) {
        const c = await getProjectContract(address, provider.getSigner());

        if (c && !didCancel) {
          setContract(c);
        }
      }
    }

    getContract();
    return () => {
      didCancel = true;
    };
  }, [chainId, address, provider]);

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
