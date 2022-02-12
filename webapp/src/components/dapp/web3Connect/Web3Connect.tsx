import { FC, useState, useEffect, useCallback } from 'react';
import { Network } from '@web3-react/network';
import MetaMaskConnect from './MetaMaskConnect';

import { CHAINS, getAddChainParameters } from '../../../utils/chains';
import { hooks } from '../../../connectors/priorityConnector';
import ErrorAlert from '../../ErrorAlert';
import SelectNetwork from './SelectNetwork';
import Account from './Account';

const { usePriorityConnector, usePriorityChainId, usePriorityAccount, usePriorityIsActive, usePriorityError } = hooks;

const Web3Connect: FC = () => {
  const connector = usePriorityConnector();
  const currentChainId = usePriorityChainId();
  const isActive = usePriorityIsActive();
  const error = usePriorityError();
  const account = usePriorityAccount();

  const [desiredChainId, setDesiredChainId] = useState(1337);

  const setChainId = useCallback((chainId: number) => {
    setDesiredChainId(chainId);

    if (chainId !== -1 && chainId !== currentChainId && isActive) {
      if (connector instanceof Network) {
        connector.activate(chainId === -1 ? undefined : chainId);
      } else {
        connector.activate(chainId === -1 ? undefined : getAddChainParameters(chainId));
      }
    }
  }, [currentChainId, isActive, connector]);

  useEffect(() => {
    if (currentChainId && Object.keys(CHAINS).includes(String(currentChainId))) {
      setDesiredChainId(currentChainId);
    }
  }, [currentChainId]);

  useEffect(() => {
    if (isActive && !Object.keys(CHAINS).includes(String(currentChainId))) {
      setDesiredChainId(-1);
    }
  }, [currentChainId, isActive]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <SelectNetwork desiredChainId={desiredChainId} setChainId={setChainId} />

      {account ? (
        <Account />
      ) : (
        <MetaMaskConnect desiredChainId={desiredChainId} />
      )}

      {error && (
        <ErrorAlert isOpen>
          {error.name ?? 'Error'}: {error.message}
        </ErrorAlert>
      )}

    </div>
  );
};

export default Web3Connect;
