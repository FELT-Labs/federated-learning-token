import { FC, useState, useEffect, useCallback } from 'react';
import { CHAINS, getAddChainParameters } from '../../../utils/chains';
import { metaMask, hooks } from '../../../connectors/metaMask';
import ErrorAlert from '../../ErrorAlert';

import SelectNetwork from './SelectNetwork';
import Account from './Account';
import MetaMaskConnect from './MetaMaskConnect';

const Web3Connect: FC = () => {
  const { useChainId, useIsActive, useError } = hooks;
  const currentChainId = useChainId();
  const isActive = useIsActive();
  const error = useError();

  const [desiredChainId, setDesiredChainId] = useState(1337);

  const setChainId = useCallback((chainId: number) => {
    setDesiredChainId(chainId);

    if (chainId !== -1 && chainId !== currentChainId && isActive) {
      metaMask.activate(getAddChainParameters(chainId));
    }
  }, [currentChainId, isActive]);

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

      {isActive ? (
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
