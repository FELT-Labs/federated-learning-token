import { BigNumber } from 'ethers';

// Project Manager types
export type Project = [string, string, string, number];

// Project types
export type TPlan = {
    numRounds: number;
    numNodes: BigNumber;
    totalReward: BigNumber;
    nodeReward: BigNumber;
    creator: string;
    baseModelCID: string;
    finalModelCID: string;
};

export type Node = {
    activated: boolean;
    entryKeyTurn: BigNumber;
    parity: boolean;
    secret0: string;
    secret1: string;
    secret2: string;
    _address: string;
};
