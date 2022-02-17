import { Provider } from '@web3-react/types';
import { encrypt } from '@metamask/eth-sig-util';
import { Contract, utils } from 'ethers';
import { sha256 } from 'hash.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ascii85 = require('ascii85');

export async function getPublicKey(provider: Provider, account: string): Promise<Buffer> {
  const keyB64 = await provider.request({
    method: 'eth_getEncryptionPublicKey',
    params: [account],
  }) as string;
  return Buffer.from(keyB64, 'base64');
}

export function encryptSecret(publicKey: Buffer, data: Buffer): number[] {
  const enc = encrypt({
    publicKey: publicKey.toString('base64'),
    data: ascii85.encode(data).toString(),
    version: 'x25519-xsalsa20-poly1305',
  });
  const buf = Buffer.concat([
    Buffer.from(enc.ephemPublicKey, 'base64'),
    Buffer.from(enc.nonce, 'base64'),
    Buffer.from(enc.ciphertext, 'base64'),
  ]);
  // Convert to number[] required by contract constructor
  return buf.toJSON().data;
}

export async function decryptData(provider: Provider, account: string, data: Buffer): Promise<Buffer> {
  const structuredData = {
    version: 'x25519-xsalsa20-poly1305',
    ephemPublicKey: data.slice(0, 32).toString('base64'),
    nonce: data.slice(32, 56).toString('base64'),
    ciphertext: data.slice(56).toString('base64'),
  };
  // Convert data to hex string
  const ct = `0x${Buffer.from(JSON.stringify(structuredData), 'utf8').toString('hex')}`;
  const decrypt = await provider.request({
    method: 'eth_decrypt',
    params: [ct, account],
  });
  return ascii85.decode(decrypt);
}

export function generateRandomSecret(): Buffer {
  return Buffer.from(utils.randomBytes(32));
}

export async function getNodeSecret(provider: Provider, contract: Contract, account: string): Promise<Buffer> {
  const secret = await contract.getNodeSecret(account);
  const key = Buffer.from(secret.map((x: string) => parseInt(x, 16)));
  return decryptData(provider, account, key);
}

export async function getNodeCurrentSecret(provider: Provider, contract: Contract, account: string): Promise<Buffer> {
  let secret = await getNodeSecret(provider, contract, account);

  const index = await contract.nodeState(account);
  const node = await contract.nodesArray(index.toNumber() - 3);
  const keyTurn = await contract.keyTurn();
  for (let i = node.entryKeyTurn; i < keyTurn; i++) {
    secret = Buffer.from(sha256().update(secret).digest('hex'), 'hex');
  }
  return secret;
}
