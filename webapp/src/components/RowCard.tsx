import { FC, useState, ReactNode } from 'react';
import CircleIcon from './CircleIcon';

interface CardProps {
  text: string;
  icon?: ReactNode;
}

const RowCard: FC<CardProps> = ({ text, icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        padding: 16,
        margin: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxShadow: hovered
          ? '0 40px 60px -20px rgb(7 29 43 / 45%)'
          : '0 40px 60px -20px rgb(7 29 43 / 15%)',
      }}
    >
      {icon && (
        <CircleIcon color="primary" {...{ icon }} style={{ minWidth: '2.375rem' }} />
      )}
      <p className="ps-2 card-text">{text}</p>
    </div>
  );
};

export default RowCard;
