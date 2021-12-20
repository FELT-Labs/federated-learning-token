import React, { FC } from 'react';

import ethereumLogo from '../../assets/companies/ethereum.png';
import filecoinLogo from '../../assets/companies/filecoin.png';
import ipfsLogo from '../../assets/companies/ipfs.png';
import chainlinkLogo from '../../assets/companies/chainlink.png';

const LogoBar: FC = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'scroll',
          gap: 16,
          marginTop: -60,
          height: 140,
          padding: 24,
          filter: 'grayscale(100%)',
        }}
      >
        <img src={ethereumLogo} alt="ethereum" height="100%" />
        <img src={filecoinLogo} alt="filecoin" height="100%" />
        <img src={ipfsLogo} alt="ipfs" height="100%" />
        <img src={chainlinkLogo} alt="chainlink" height="100%" />
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
        <h4 style={{ color: '#EEEEEE', marginTop: 12 }}>
          Created during Chainlink Hackathon 2021
        </h4>
      </div>
    </div>
  );
};

export default LogoBar;
