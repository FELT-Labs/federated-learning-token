import { FC, useState } from 'react';
import { Tooltip, TooltipProps } from 'reactstrap';

const SimpleTooltip: FC<TooltipProps> = (props) => {
  const [isOpen, setOpen] = useState(false);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Tooltip isOpen={isOpen} toggle={() => setOpen(!isOpen)} {...props} />;
};

export default SimpleTooltip;
