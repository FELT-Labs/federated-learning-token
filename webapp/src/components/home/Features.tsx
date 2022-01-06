import { FC } from 'react';
import { DollarSign, Edit3, EyeOff, Lock } from 'react-feather';
import RowCard from '../RowCard';

const Features: FC = () => (
  <>
    <RowCard
      text="Create decentralized federated learning projects and train models easily without extra programming."
      icon={<Edit3 />}
    />
    <RowCard
      text="Fully anonymized participation of data providers."
      icon={<EyeOff />}
    />
    <RowCard text="Encrypted exchange of all results." icon={<Lock />} />
    <RowCard text="Get paid for providing data for training." icon={<DollarSign />} />
  </>
);

export default Features;
