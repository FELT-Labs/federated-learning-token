import { Signer, utils } from 'ethers';

export interface PublicKeyType {
  parity: boolean;
  key: Uint8Array;
}

export async function getPublicKey(signer: Signer): Promise<PublicKeyType> {
  const message = 'Please sign this message in order to share your PUBLIC key with new project contract.';
  const signature = await signer.signMessage(message);
  const recoveredPubKey = utils.recoverPublicKey(
    utils.arrayify(utils.hashMessage(message)),
    signature,
  );
  const cPublicKey = utils.computePublicKey(recoveredPubKey, true);
  return {
    parity: cPublicKey.substring(2, 4) !== '02',
    key: utils.arrayify(`0x${cPublicKey.substring(4)}`),
  };
}
