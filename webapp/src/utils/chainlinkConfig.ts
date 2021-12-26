import { utils } from 'ethers';

interface config {
  keyhash: Uint8Array;
  vrfCoordinator: string;
  linkToken: string;
  fee: string;
}

interface configType {
  [key: number]: config;
}

const ChainlinkConfig: configType = {
  // Matic (polygon)
  137: {
    keyhash: utils.arrayify(
      '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da',
    ),
    vrfCoordinator: '0x3d2341ADb2D31f1c5530cDC622016af293177AE0',
    linkToken: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
    fee: '100000000000000000',
  },
  // Mumbai (polygon)
  80001: {
    keyhash: utils.arrayify(
      '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
    ),
    vrfCoordinator: '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    fee: '100000000000000000',
  },
  // Ganache
  1337: {
    keyhash: utils.arrayify(
      '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
    ),
    vrfCoordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
    linkToken: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
    fee: '100000000000000000',
  },
};

export default ChainlinkConfig;
