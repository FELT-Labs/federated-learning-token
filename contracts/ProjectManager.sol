// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

/**
 * @title Project Contract Manager
 * @notice Contract for managing individual projects at one place.
 * @dev Helps with activation and referencing of the contract and allows referencing contracts from the webapp.
 */
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

    constructor(FELToken _token) {
        token = _token;
    }

    function setFee(uint256 fee) public onlyOwner {
        activationFee = fee;
    }

    function getProjectsLength() external view returns (uint256) {
        return projects.length;
    }

    /**
     * @notice Add a new project contract to the list of projects.
     */
    function activateProject(
        address _contract,
        string memory name,
        string memory description,
        uint256 transferAmount
    ) public returns(bool) {
        token.transferFrom(msg.sender, address(this), activationFee);
        token.transferFrom(msg.sender, _contract, transferAmount);

        projects.push(Project(_contract, name, description, block.timestamp));

        return true;
    }

    // TODO: Add contract creation function
}

