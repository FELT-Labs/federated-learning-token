import { FC, CSSProperties, ReactNode } from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';

type propTypes = {
  icon: ReactNode;
  light?: boolean;
  color?: string;
  style?: CSSProperties;
};

const CircleIcon: FC<propTypes> = ({ icon, light = false, color = 'success', style = {} }) => (
  <Button
    className="btn-icon-only rounded-circle ml-1 cursor-default"
    color={color}
    style={style}
  >
    <span className={classNames('btn-inner--icon', { 'text-white': !light })}>
      {icon}
    </span>
  </Button>
);

export default CircleIcon;
