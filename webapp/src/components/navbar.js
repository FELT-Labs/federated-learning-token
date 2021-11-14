import React from "react";
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Collapse,
  NavbarText,
  NavbarToggler,
} from "reactstrap";

import { GitHub } from 'react-feather';

class MainNavbar extends React.Component {
  state = {
    isOpen: false,
  }

  toggleNavbar = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <header className="header-global">
        <Navbar
          expand="md"
          container="lg"
          light
        >
          <NavbarBrand href="/">
            FELT
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse navbar isOpen={this.state.isOpen}>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <NavLink href="#">
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  Application
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  Contact us
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <NavLink href="https://github.com/Breta01/federated-learning-token">
                <GitHub />
              </NavLink>
            </NavbarText>
            <Nav>
              <NavItem>
                <Button
                  color="primary"
                  outline
                  size=""
                >
                  Start building
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default MainNavbar;
