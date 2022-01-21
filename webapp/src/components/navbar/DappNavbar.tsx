import { FC, useState, useEffect, useCallback } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { BigNumber, utils } from 'ethers';
import { ReactComponent as MetaMaskSvg } from '../../assets/metamask-fox.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { CHAINS, getAddChainParameters } from '../../utils/chains';
import { metaMask, hooks } from '../../connectors/metaMask';
import ErrorAlert from '../ErrorAlert';

const Account: FC = () => {
  const { useAccount, useProvider, useENSNames } = hooks;
  const account = useAccount();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<BigNumber | undefined>();

  useEffect(() => {
    if (provider && account) {
      provider.getBalance(account).then((n) => setBalance(n));
    } else {
      setBalance(undefined);
    }
  }, [provider, account]);

  useEffect(() => {
    if (account) {
      const tmp = ENSNames?.[0] ?? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
      setAddress(tmp);
    } else {
      setAddress(undefined);
    }
  }, [ENSNames, account]);

  if (!account) return <div>-</div>;

  return (
    <div>
      {balance ? `(Ξ${utils.formatEther(balance)})` : null}
      <b>{address}</b>
    </div>
  );
};

interface SelectNetworkProps {
    desiredChainId: number;
    setChainId: (chainId: number) => void;
}
const SelectNetwork: FC<SelectNetworkProps> = ({ desiredChainId, setChainId }) => {
  const { useIsActivating } = hooks;
  const isActivating = useIsActivating();

  return (
    <select
      value={desiredChainId}
      onChange={(event) => setChainId(Number(event.target.value))}
      disabled={isActivating}
    >
      {Object.keys(CHAINS).map((key) => (
        <option key={Number(key)} value={key}>
          {CHAINS[Number(key)].name}
        </option>
      ))}
    </select>
  );
};

interface MetaMaskConnectProps {
    desiredChainId: number;
}
const MetaMaskConnect: FC<MetaMaskConnectProps> = ({ desiredChainId }) => {
  const { useIsActivating } = hooks;
  const isActivating = useIsActivating();

  const clickConnect = () => {
    if (isActivating) return;
    metaMask.activate(getAddChainParameters(desiredChainId));
  };

  return (
    <button type="button" onClick={clickConnect} disabled={isActivating}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 4 }}>
        <MetaMaskSvg width={32} />
        {isActivating ? 'Connecting...' : 'Connect'}
      </div>
    </button>
  );
};

const Web3Connect: FC = () => {
  const { useChainId, useIsActive, useError } = hooks;

  const currentChainId = useChainId();
  const isActive = useIsActive();
  const error = useError();

  const [desiredChainId, setDesiredChainId] = useState(1337);

  const setChainId = useCallback((chainId: number) => {
    setDesiredChainId(chainId);

    if (chainId !== currentChainId && isActive) {
      metaMask.activate(getAddChainParameters(chainId));
    }
  }, [currentChainId, isActive]);

  useEffect(() => {
    if (currentChainId) {
      setDesiredChainId(currentChainId);
    }
  }, [currentChainId]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div>Chain Id: {currentChainId ? <b>{currentChainId}</b> : '-'}</div>
      <SelectNetwork desiredChainId={desiredChainId} setChainId={setChainId} />

      {isActive ? (
        <Account />
      ) : (
        <MetaMaskConnect desiredChainId={desiredChainId} />
      )}

      {error && (
        <ErrorAlert isOpen>
          {error.name ?? 'Error'}: {error.message}
        </ErrorAlert>
      )}

    </div>
  );
};

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
