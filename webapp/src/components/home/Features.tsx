import { FC } from 'react';
import RowCard from '../RowCard';
import { ReactComponent as Contract } from '../../assets/icons/contract.svg';
import { ReactComponent as Private } from '../../assets/icons/hidden.svg';
import { ReactComponent as Malware } from '../../assets/icons/malware.svg';
import { ReactComponent as Encrypted } from '../../assets/icons/encrypted.svg';
import { ReactComponent as Reward } from '../../assets/icons/reward.svg';

const Features: FC = () => (
  <>
    <RowCard
      text="Ecosystem of smart contracts for decentralized federated learning."
      icon={<Contract />}
    />
    <RowCard
      text="Fully anonymized participation of data providers."
      icon={<Private />}
    />
    <RowCard
      text="Preventing malicious activities and attacks on infrastructure."
      icon={<Malware />}
    />
    <RowCard text="Encrypted exchange of all results." icon={<Encrypted />} />
    <RowCard text="Rewarding active participation." icon={<Reward />} />
  </>
);

export default Features;
