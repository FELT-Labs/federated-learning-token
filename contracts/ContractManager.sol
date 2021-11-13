// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Token.sol";

contract ContractManager is Ownable {
    // Referencing active contracts
    FELToken private token;
    address[] public contracts;
    uint public activationFee = 100;

    constructor(FELToken _token) public {
        token = _token;
    }

    function setFee(uint fee) public onlyOwner {
        activationFee = fee;
    }

    // TODO: Add contract creation function
    function activateContract(address _contract, uint transferAmount) public returns(bool) {
        token.transferFrom(msg.sender, address(this), activationFee);
        token.transferFrom(msg.sender, _contract, transferAmount);

        // TODO: Transfer link and token to the contract

        contracts.push(_contract);

        return true;
    }
}

