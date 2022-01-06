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
import { GitHub, Twitter } from 'react-feather';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Discord } from '../../assets/icons/discord.svg';

const HomeNavbar: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Navbar expand="md" container="lg" light className="shadow">
      <NavbarBrand tag={RouterNavLink} to="/">
        <Logo width={50} height={50} fill="#32325d" />
        FELT
      </NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!isOpen)} />
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="#">FAQ</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="https://docs.feltoken.ai/">Docs</NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={RouterNavLink} to="/app">
              App
            </NavLink>
          </NavItem>
        </Nav>

        <NavbarText>
          <NavLink href="https://twitter.com/FELToken">
            <Twitter />
          </NavLink>
        </NavbarText>
        <NavbarText>
          <NavLink href="https://discord.gg/G4ZFfstsV2">
            <Discord className="hover-fill-svg" width="35" height="35" />
          </NavLink>
        </NavbarText>
        <NavbarText className="pe-3">
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
