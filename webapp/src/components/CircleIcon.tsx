import { FC, CSSProperties, ReactNode } from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';

type propTypes = {
  icon: ReactNode;
  light?: boolean;
  color?: string;
  style?: CSSProperties;
  size?: string;
};

const CircleIcon: FC<propTypes> = ({ icon, light = false, color = 'success', style = {}, size = '' }) => (
  <Button
    className="btn-icon-only rounded-circle cursor-default"
    color={color}
    style={style}
    size={size}
  >
    <span className={classNames('btn-inner--icon', { 'text-white': !light })}>
      {icon}
    </span>
  </Button>
);

export default CircleIcon;
