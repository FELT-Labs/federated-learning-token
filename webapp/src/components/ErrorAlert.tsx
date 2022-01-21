import { FC, ReactNode, useEffect, useState } from 'react';
import { X, AlertTriangle } from 'react-feather';

interface AlertProps {
    isOpen: boolean;
    children: ReactNode;
}

const ErrorAlert: FC<AlertProps> = ({ isOpen, children }) => {
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
      backgroundColor: '#F8D7DA',
      margin: 'auto',
      padding: '16px 12px 16px 20px',
      zIndex: 10,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      color: '#842029',
    }}
    >
      <AlertTriangle style={{ marginRight: 8 }} />
      {children}
      <X style={{ marginLeft: 20, cursor: 'pointer' }} onClick={() => setOpen(false)} />
    </div>
  );
};

export default ErrorAlert;
