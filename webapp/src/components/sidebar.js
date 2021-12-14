import React, { useState } from "react";
import { NavItem, NavLink, Nav, Button } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { ChevronLeft, ChevronRight, User } from "react-feather";


function Sidebar() {
	const { account } = useWeb3React();
	const [isOpen, toggle] = useState(true);

	return (
		<div className={classNames("sidebar", { "is-open": isOpen })}>
			<div className="sidebar-header">
				<Button className="toggleButton p-0" onClick={() => toggle(!isOpen)}
					tag={isOpen ? ChevronLeft : ChevronRight}
				/>
				<div className="px-3">
					<User color="white" />
					<span className="p-3 align-middle">
					{account
						? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
						: 'No account connected'}
						</span>

				</div>
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