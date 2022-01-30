import { FC } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Web3Connect from '../dapp/web3Connect/Web3Connect';

const DappNavbar: FC = () => (
  <Navbar expand="md" container="lg" light className="shadow">
    <NavbarBrand tag={RouterNavLink} to="/">
      <Logo width={50} height={50} fill="#32325d" />
      FELT
    </NavbarBrand>

    <Web3Connect />
  </Navbar>
);

export default DappNavbar;
