import { FC, useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Spinner } from 'reactstrap';
import { getProjectContract } from '../utils/contracts';
import ProjectSummary from '../components/project/ProjectSummary';
import ProjectPlans from '../components/project/ProjectPlans';

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
      {contract === undefined ? (
        <Spinner className="m-3" />
      ) : (
        <>
          <ProjectSummary contract={contract} />
          <ProjectPlans contract={contract} />
        </>
      )}
    </div>
  );
};

export default Project;
