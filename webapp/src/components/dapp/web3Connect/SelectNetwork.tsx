import { FC } from 'react';
import { hooks } from '../../../connectors/metaMask';
import { CHAINS } from '../../../utils/chains';

interface SelectNetworkProps {
    desiredChainId: number;
    setChainId: (chainId: number) => void;
}

const SelectNetwork: FC<SelectNetworkProps> = ({ desiredChainId, setChainId }) => {
  const { useIsActivating } = hooks;
  const isActivating = useIsActivating();

  return (
    <select
      value={desiredChainId}
      onChange={(event) => setChainId(Number(event.target.value))}
      disabled={isActivating}
      style={{
        color: '#fff',
        backgroundColor: '#697dcf',
        opacity: 0.4,
        border: '1px solid gray',
        borderRadius: 4,
        padding: '0.5em',
        marginRight: 10,
        margin: '0.5em 0',
      }}
    >
      <option value={-1} disabled>-</option>
      {Object.keys(CHAINS).map((key) => (
        <option key={Number(key)} value={key}>
          {CHAINS[Number(key)].name}
        </option>
      ))}
    </select>
  );
};

export default SelectNetwork;
