import { FC, useState, useEffect } from 'react';
import { Input, NavItem, NavLink, Nav, Button, Spinner } from 'reactstrap';
import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';
import { utils, BigNumber } from 'ethers';
import {
  Box,
  ChevronLeft,
  ChevronRight,
  User,
  DollarSign,
} from 'react-feather';

import { network, walletconnect, injected } from '../utils/connectors';
import SimpleTooltip from './tooltip';
import { ReactComponent as TokenSvg } from '../assets/logo.svg';
import { ReactComponent as MetaMaskSvg } from '../assets/metamask-fox.svg';
import { ReactComponent as WalletConnectSvg } from '../assets/walletconnect-logo.svg';

interface ChainsData {
  [key: number]: string;
}

const SupportedChains: ChainsData = {
  137: 'Polygon Mainnet',
  80001: 'Matic Mumbai (testnet)',
  1337: 'Local Network (testnet)',
};

const Balance: FC = () => {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState<undefined | BigNumber>();
  useEffect(() => {
    let stale = false;

    if (!!account && !!library) {
      library
        .getBalance(account)
        .then((b: BigNumber) => !stale && setBalance(b))
        .catch(() => !stale && setBalance(undefined));
    }

    return () => {
      stale = true;
      setBalance(undefined);
    };
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <div id="balanceEther" className="row mb-3 px-3 align-items-center">
        <DollarSign className="col-2" color="white" />
        <span className="col-10">
          {!!balance && utils.formatEther(balance.toString())}
        </span>
        <SimpleTooltip placement="bottom" target="balanceEther">
          Account Polygon balance
        </SimpleTooltip>
      </div>
      <div id="balanceToken" className="row mb-3 px-3 align-items-center">
        <TokenSvg fill="white" className="col-2" width="24" height="24" />
        <span className="col-10">TODO: token balance</span>
        <SimpleTooltip placement="bottom" target="balanceToken">
          Account FELT token balance
        </SimpleTooltip>
      </div>
    </>
  );
};

interface SidebarProps {
  isActivating: (a: string) => boolean;
  activateConnector: (a: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ isActivating, activateConnector }) => {
  const { account, chainId, connector, deactivate } = useWeb3React();
  const [isOpen, toggle] = useState(true);

  return (
    <div className={classNames('sidebar', { 'is-open': isOpen })}>
      <Button
        className="toggleButton mb-3 p-0"
        onClick={() => toggle(!isOpen)}
        tag={isOpen ? ChevronLeft : ChevronRight}
      />

      {/* Blockchain display + select */}
      <div id="chain-input" className="row px-3 mb-3 align-items-center">
        <Box className="col-2" color="white" />
        <div className="col-10">
          {connector === network ? (
            <Input
              name="select"
              type="select"
              value={chainId}
              onChange={(e) => network.changeChainId(Number(e.target.value))}
            >
              {Object.entries(SupportedChains).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Input>
          ) : (
            chainId && SupportedChains[chainId]
          )}
        </div>
        <SimpleTooltip placement="bottom" target="chain-input">
          Selected blockchain
          {connector !== network
            ? ', change it inside MetaMask or your WalletConnect'
            : ''}
        </SimpleTooltip>
      </div>

      {/* User address */}
      <div id="user" className="row mb-3 px-3 align-items-center">
        <User className="col-2" color="white" />
        <span className="col-10">
          {account ? (
            <>
              {account.substring(0, 8)}...
              {account.substring(account.length - 4)}
              {connector === injected && (
                <MetaMaskSvg
                  className="cursor-default mx-2 p-0 btn btn-secondary align-text-bottom"
                  height="20"
                  width="20"
                />
              )}
              {connector === walletconnect && (
                <WalletConnectSvg
                  className="cursor-default mx-2 p-0 btn btn-secondary align-text-bottom"
                  height="20"
                  width="20"
                />
              )}
            </>
          ) : (
            'No account connected'
          )}
        </span>
        <SimpleTooltip placement="bottom" target="user">
          Your connected account address
        </SimpleTooltip>
      </div>

      {/* User balances */}
      {!!account && <Balance />}

      <hr className="m-3" />

      <Nav pills vertical fill className="mx-3">
        {account ? (
          <NavItem>
            {/* TODO: maybe use connector.close() for WalletConnect, see example app */}
            <NavLink onClick={() => deactivate()}>Disconnect</NavLink>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <NavLink onClick={() => activateConnector('Injected')}>
                {isActivating('Injected') ? (
                  <MetaMaskSvg height="24" width="24" />
                ) : (
                  <Spinner style={{ height: '15px', width: '15px' }} />
                )}{' '}
                Connect MetaMask
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => activateConnector('WalletConnect')}>
                {isActivating('WalletConnect') ? (
                  <WalletConnectSvg height="24" width="24" />
                ) : (
                  <Spinner style={{ height: '15px', width: '15px' }} />
                )}{' '}
                Connect WalletConnect
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
