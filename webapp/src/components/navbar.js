import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
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

function MainNavbar({isFull = true}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="header-global">
      <Navbar
        className="shadow"
        expand="md"
        container="lg"
        light
      >
        <NavbarBrand tag={RouterNavLink} to="/">
          FELT
        </NavbarBrand>
        <NavbarToggler onClick={() => setOpen(!isOpen)} />
        <Collapse navbar isOpen={isOpen}>
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
              <NavLink tag={RouterNavLink} to="app">
                Application
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <NavLink href="https://github.com/Breta01/federated-learning-token">
              <GitHub />
            </NavLink>
          </NavbarText>
          {isFull &&
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
          }
        </Collapse>
      </Navbar>
    </header>
  );
}


export default MainNavbar;
