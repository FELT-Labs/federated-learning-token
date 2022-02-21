import { FC, ReactNode, useEffect, useState } from 'react';
import { X, AlertTriangle, Info } from 'react-feather';

interface AlertProps {
    isOpen: boolean;
    children: ReactNode;
    error?: boolean;
}

const Alert: FC<AlertProps> = ({ isOpen, children, error = true }) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 7000);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 40,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: (error ? '#F8D7DA' : '#d7ecf8'),
      margin: 'auto',
      padding: '16px 12px 16px 20px',
      zIndex: 10,
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      color: (error ? '#842029' : '#204084'),
    }}
    >
      {error ? <AlertTriangle style={{ marginRight: 8 }} /> : <Info style={{ marginRight: 8 }} />}
      {children}
      <X style={{ marginLeft: 20, cursor: 'pointer' }} onClick={() => setOpen(false)} />
    </div>
  );
};

export default Alert;
