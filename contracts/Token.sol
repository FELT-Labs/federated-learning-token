// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FELToken is ERC20 {
    // Referencing active contracts
    address[] public contracts;

    constructor(uint256 initialSupply) ERC20("Federated Token", "FELT") public {
        _mint(msg.sender, initialSupply);
    }

    // TODO: Add contract creation function
    function activateContract(address _contract) public returns(bool) {
        // TODO: Check and transfer init resources
        contracts.push(_contract);
        return true;
    }
}
