import { FC, useState } from 'react';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { GitHub } from 'react-feather';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const HomeNavbar: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Navbar expand="md" container="lg" light>
      <NavbarBrand tag={RouterNavLink} to="/">
        <Logo width={50} height={50} />
        FELT
      </NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!isOpen)} />
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="#">FAQ</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#">Docs</NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={RouterNavLink} to="app">
              App
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
            <Button color="primary" outline size="">
              Start building
            </Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default HomeNavbar;
