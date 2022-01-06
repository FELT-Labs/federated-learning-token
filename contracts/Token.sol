// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title FELToken
 * @notice Token for interacting in the FELToken (federated learning) ecosystem
 * @dev Right now it is just a wrapper for ERC20 token
 */
contract FELToken is ERC20 {
    // Referencing active contracts
    constructor(uint256 initialSupply) ERC20("Federated Token", "FELT") {
        _mint(msg.sender, initialSupply);
    }
}
