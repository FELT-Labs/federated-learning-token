import { FC, useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { hooks } from '../../../connectors/metaMask';
import Balance from './Balance';
import { CHAINS } from '../../../utils/chains';
import { ReactComponent as MetaMaskSvg } from '../../../assets/metamask-fox.svg';

const Account: FC = () => {
  const { useAccount, useProvider, useENSName, useChainId } = hooks;
  const account = useAccount();
  const provider = useProvider();
  const ENSName = useENSName(provider);
  const chainId = useChainId();

  const [address, setAddress] = useState<string>();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (account) {
      const tmp = ENSName ?? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
      setAddress(tmp);
    } else {
      setAddress(undefined);
    }
  }, [ENSName, account]);

  if (!Object.keys(CHAINS).includes(String(chainId))) {
    return (
      <>
        <Button color="danger" onClick={() => setShowDetails(true)} style={{ textTransform: 'none', borderRadius: 12 }}>
          Unsupported Network
        </Button>
        <Modal isOpen={showDetails}>
          <ModalHeader toggle={() => setShowDetails(false)}>
            Unsupported network
          </ModalHeader>
          <ModalBody>
            <p>Please connect to a supported network in the dropdown menu or in your wallet.</p>
          </ModalBody>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => setShowDetails(true)} style={{ textTransform: 'none', borderRadius: 20 }}>
        {address}
      </Button>
      <Modal isOpen={showDetails}>
        <ModalHeader toggle={() => setShowDetails(false)}>
          {address}
        </ModalHeader>
        <ModalBody>
          <p>You are connected through MetaMask <MetaMaskSvg width={32} /></p>
          <Balance />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Account;
