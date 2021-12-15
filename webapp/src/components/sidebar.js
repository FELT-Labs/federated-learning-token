import React, { useState } from "react";
import { Input, NavItem, NavLink, Nav, Button, Tooltip } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Box, ChevronLeft, ChevronRight, User } from "react-feather";

import {
	network,
} from '../utils/connectors';



const SupportedChains = [
	{ id: 137, name: "Polygon Mainnet" },
	{ id: 80001, name: "Matic Mumbai (testnet)" },
	{ id: 1337, name: "Local Network (testnet)" },
]



class SimpleTooltip extends React.Component {
  state = {isOpen: false};

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render () {
    return <Tooltip isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />;
  }
}


function Sidebar() {
	const { account, chainId, connector } = useWeb3React();
	const [isOpen, toggle] = useState(true);

	return (
		<div className={classNames("sidebar", { "is-open": isOpen })}>
			<div className="sidebar-header">
				<Button className="toggleButton p-0" onClick={() => toggle(!isOpen)}
					tag={isOpen ? ChevronLeft : ChevronRight}
				/>
				<div className="row mb-3 px-3 align-items-center">
					<User className="col-sm-2" color="white" />
					<span className="col-sm-10">
					{account
						? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
						: 'No account connected'}
						</span>

				</div>
				<div id="chain-input" className="row px-3 align-items-center">
					<Box className="col-sm-2" color="white" />
					<div  class="col-sm-10">
						<Input
							name="select"
							type="select"
							value={chainId}
							onChange={e => connector.changeChainId(e.target.value)}
							disabled={connector !== network}
						>
							{SupportedChains.map(({id, name}) => (
								<option key={id} value={id} selected={id === chainId}>{name}</option>
							))}
						</Input>
					</div>
				</div>
				<SimpleTooltip placement="right" target="chain-input" >Valid grades are  blah, blah</SimpleTooltip>	
				
				<h3>Bootstrap Sidebar</h3>
			</div>
			<div className="side-menu">
				<Nav vertical className="list-unstyled pb-3">
					<p>Dummy Heading</p>
					<NavItem>
						<NavLink tag={Link} to={"/about"}>
							About
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={"/pages"}>
							Portfolio
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={"/faq"}>
							FAQ
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to={"/contact"}>
							Contact
						</NavLink>
					</NavItem>
				</Nav>
			</div>
		</div>)
};

export default Sidebar;