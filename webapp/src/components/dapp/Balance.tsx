import { FC, useState, useEffect } from 'react';
import { utils, BigNumber } from 'ethers';
import { DollarSign } from 'react-feather';
import SimpleTooltip from '../tooltip';
import { ReactComponent as TokenSvg } from '../../assets/logo.svg';
import { loadContract } from '../../utils/contracts';
import { hooks } from '../../connectors/metaMask';

function formatBalance(balance: string): string {
  if (balance.length <= 15) {
    return balance;
  }
  return `${balance.substring(0, 15)}...`;
}

const Balance: FC = () => {
  const { useAccount, useProvider, useChainId } = hooks;
  const chainId = useChainId();
  const account = useAccount();
  const provider = useProvider();

  const [balance, setBalance] = useState<BigNumber>();
  const [tokenBalance, setTokenBalance] = useState<BigNumber>();

  useEffect(() => {
    let stale = false;

    if (!!account && !!provider) {
      provider
        .getBalance(account)
        .then((b: BigNumber) => !stale && setBalance(b))
        .catch(() => !stale && setBalance(undefined));
    }

    return () => {
      stale = true;
      setBalance(undefined);
    };
  }, [account, provider, chainId]);

  useEffect(() => {
    let didCancel = false;

    async function getTokenBalance() {
      if (provider && chainId && account) {
        const token = await loadContract(
          chainId,
          'FELToken',
          provider.getSigner(),
        );

        if (token) {
          const b = await token.balanceOf(account);
          if (!didCancel) {
            setTokenBalance(b);
          }
        }
      }
    }

    getTokenBalance();
    return () => {
      didCancel = true;
    };
  }, [chainId, account, provider]);

  return (
    <>
      <div id="balanceEther" className="row px-3 align-items-center">
        <DollarSign className="col-2" color="black" />
        <span className="col-10">
          {!!balance && formatBalance(utils.formatEther(balance))}
        </span>
        <SimpleTooltip placement="bottom" target="balanceEther">
          Account Polygon balance
        </SimpleTooltip>
      </div>
      <div id="balanceToken" className="row px-3 align-items-center">
        <TokenSvg fill="black" className="col-2" width="24" height="24" />
        <span className="col-10">
          {!!tokenBalance && formatBalance(utils.formatEther(tokenBalance))}
        </span>
        <SimpleTooltip placement="bottom" target="balanceToken">
          Account FELT token balance
        </SimpleTooltip>
      </div>
    </>
  );
};

export default Balance;
