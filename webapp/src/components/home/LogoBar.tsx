import React, { FC } from 'react';

import polygonLogo from '../../assets/companies/polygon.png';
import filecoinLogo from '../../assets/companies/filecoin.png';
import ipfsLogo from '../../assets/companies/ipfs.png';
import oceanLogo from '../../assets/companies/ocean.png';
import chainlinkLogo from '../../assets/companies/chainlink.png';

const LogoBar: FC = () => (
  <div>
    <div
      style={{
        display: 'flex',
        width: 'fit-content',
        maxWidth: '100%',
        margin: 'auto',
        alignItems: 'center',
        overflowX: 'auto',
        gap: 32,
        marginTop: -60,
        height: 140,
        padding: 24,
        filter: 'grayscale(100%)',
      }}
    >
      <img src={polygonLogo} alt="ethereum" height="50%" />
      <img src={filecoinLogo} alt="filecoin" height="100%" />
      <img src={ipfsLogo} alt="ipfs" height="100%" />
      <img src={oceanLogo} alt="chainlink" height="90%" />
      <img src={chainlinkLogo} alt="chainlink" height="90%" />
    </div>
    <div
      style={{
        background: 'linear-gradient(135deg, #4FABCE, #4347BA)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
      }}
    >
      <h4 style={{ color: '#EEEEEE', marginTop: 12, textAlign: 'center' }}>
        Created during Chainlink Hackathon 2021
      </h4>
    </div>
  </div>
);

export default LogoBar;
