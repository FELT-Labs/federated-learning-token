import { useState } from "react";
import { Tooltip } from "reactstrap";

function SimpleTooltip(props) {
	const [isOpen, setOpen] = useState(false);

  return <Tooltip isOpen={isOpen} toggle={() => setOpen(!isOpen)} {...props} />;
}

export default SimpleTooltip;