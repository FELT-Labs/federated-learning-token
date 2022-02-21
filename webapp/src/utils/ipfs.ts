import { Provider } from '@web3-react/types';
import { saveAs } from 'file-saver';

import { decryptData } from './cryptography';

export const downloadCID = async (cid: string): Promise<Buffer> => {
  const file = await fetch(`https://ipfs.io/ipfs/${cid}`, { method: 'GET' });
  return Buffer.from(await file.arrayBuffer());
};

export const downloadModel = async (provider: Provider, account: string, cid: string) => {
  const data = await downloadCID(cid);
  const model = await decryptData(provider, account, data);
  const blob = new Blob([model], { type: 'application/octet-stream' });
  saveAs(blob, 'model.joblib');
};
