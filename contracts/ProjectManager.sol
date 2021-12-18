// SPDX-License-Identifier: GPL3
/*
   Contract for managing individual projects at one place. This helps with
   activation and referencing of the contract and allowes referencing
   contracts from the homepage (webapp).
*/
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Token.sol";

// TODO: Function for chainlink withdraw

contract ProjectManager is Ownable {
    struct Project {
        address _address;
        string name;
        string description;
        uint256 creationTime;
    }

    // Referencing active contracts
    FELToken private token;
    Project[] public projects;
    uint256 public activationFee = 0;

    constructor(FELToken _token) public {
        token = _token;
    }

    function setFee(uint256 fee) public onlyOwner {
        activationFee = fee;
    }

    function getProjectsLength() external view returns (uint256) {
        return projects.length;
    }

    // TODO: Add contract creation function
    function activateProject(
        address _contract,
        string memory name,
        string memory description,
        uint256 transferAmount
    ) public returns(bool) {
        token.transferFrom(msg.sender, address(this), activationFee);
        token.transferFrom(msg.sender, _contract, transferAmount);

        // TODO: Transfer link and token to the contract

        projects.push(Project(_contract, name, description, block.timestamp));

        return true;
    }
}

