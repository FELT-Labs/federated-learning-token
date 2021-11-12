// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;


import "./Token.sol";

contract ContractManager {
    // Referencing active contracts
    FELToken private token;
    address[] public contracts;
    uint public activationFee = 100;

    constructor(FELToken _token) public {
        token = _token;
    }

    // TODO: Add contract creation function
    function activateContract(address _contract) public returns(bool) {
        token.transferFrom(msg.sender, address(this), 100);
        token.transferFrom(msg.sender, _contract, 100);

        // TODO: Transfer link and token to the contract

        contracts.push(_contract);

        return true;
    }
}

