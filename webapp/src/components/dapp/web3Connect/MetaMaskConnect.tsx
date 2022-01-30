import { FC } from 'react';
import { Button } from 'reactstrap';
import { metaMask, hooks } from '../../../connectors/metaMask';
import { ReactComponent as MetaMaskSvg } from '../../../assets/metamask-fox.svg';
import { getAddChainParameters } from '../../../utils/chains';

interface MetaMaskConnectProps {
    desiredChainId: number;
}

const MetaMaskConnect: FC<MetaMaskConnectProps> = ({ desiredChainId }) => {
  const { useIsActivating } = hooks;
  const isActivating = useIsActivating();

  const clickConnect = () => {
    if (isActivating) return;
    metaMask.activate(getAddChainParameters(desiredChainId));
  };

  return (
    <Button onClick={clickConnect} disabled={isActivating || desiredChainId === -1}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <MetaMaskSvg width={32} />
        {isActivating ? 'Connecting...' : 'Connect'}
      </div>
    </Button>
  );
};

export default MetaMaskConnect;
