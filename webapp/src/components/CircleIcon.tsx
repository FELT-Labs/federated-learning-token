import { FC, CSSProperties, ReactNode, MouseEventHandler } from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';

type propTypes = {
  icon: ReactNode;
  light?: boolean;
  color?: string;
  style?: CSSProperties;
  size?: string;
  onClick?: MouseEventHandler;
};

const CircleIcon: FC<propTypes> = ({ icon, light = false, color = 'success', style = {}, size = '', onClick }) => (
  <Button
    className={`btn-icon-only rounded-circle ${!onClick && 'cursor-default'}`}
    color={color}
    style={style}
    size={size}
    onClick={onClick}
  >
    <span className={classNames('btn-inner--icon', { 'text-white': !light })}>
      {icon}
    </span>
  </Button>
);

export default CircleIcon;
