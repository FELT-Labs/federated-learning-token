import { FC, useState, ReactNode } from 'react';

interface CardProps {
  title?: string;
  text: string;
  icon?: ReactNode;
}

const Card: FC<CardProps> = ({ title, text, icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 300,
        borderRadius: 16,
        padding: '16px 32px',
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: hovered
          ? '0 40px 60px -20px rgb(7 29 43 / 45%)'
          : '0 40px 60px -20px rgb(7 29 43 / 15%)',
      }}
    >
      {title && <h5 className="card-title text-center">{title}</h5>}
      <p className="card-text">{text}</p>
      {icon && (
        <div style={{ display: 'flex', width: 40, height: 40 }}>{icon}</div>
      )}
    </div>
  );
};

export default Card;
