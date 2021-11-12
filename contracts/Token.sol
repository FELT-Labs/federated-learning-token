// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FELToken is ERC20 {
    // Referencing active contracts
    constructor(uint256 initialSupply) ERC20("Federated Token", "FELT") public {
        _mint(msg.sender, initialSupply);
    }
}
