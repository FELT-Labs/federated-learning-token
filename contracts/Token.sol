// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FEToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Federated Token", "FET") public {
        _mint(msg.sender, initialSupply);
    }

    // TODO: Add contract creation function
}
