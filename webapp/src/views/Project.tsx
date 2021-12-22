import { FC, useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Spinner } from 'reactstrap';

import { getProjectContract } from '../utils/contracts';

interface ContractProps {
  contract: Contract;
}

const ContractDisplay: FC<ContractProps> = ({ contract }) => {
  const [running, setRunning] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react/destructuring-assignment
      try {
        const r = await contract.getPlansLength();
        setRunning(r);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [contract]);

  return (
    <>
      <p>Is running: {running.toString()}</p>
      <p>Something else</p>
    </>
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
