// SPDX-License-Identifier: GPL3
/*
   Project contract manages references to data providers (nodes) and
   scientiests (plan creators). Data providers must watch this contract
   and execute new plans. This contract is instantiated for each project
   and can be edited for individual needs.

   TODO: Make interface/abstract project contract
*/
pragma solidity ^0.8.0;

import "./Token.sol";
import "./project/TrainingPlans.sol";


contract ProjectContract is TrainingPlans {
    FELToken private token;

    constructor(
        FELToken _token,
        // Builder setup
        bool parity,
        bytes32 publicKey,
        // Chainlink setup
        bytes32 _keyhash,
        address _vrfCoordinator,
        address _linkToken,
        uint256 _fee
    )
        TrainingPlans(_keyhash, _vrfCoordinator, _linkToken, _fee)
    {
        token = _token;

        // Set creator both as builder and node, might be changed in future
        builders[msg.sender] = Builder({
            _address: msg.sender,
            parity: parity,
            publicKey: publicKey
        });

        nodes[msg.sender] = 3;
        nodesArray.push(Node({
            _address: msg.sender,
            activated: false,
            parity: false,
            secret0: 0,
            secret1: 0,
            secret2: 0,
            entryKeyTurn: 0
        }));
    }


    // Create plan
    function createPlan(string memory modelCID, uint32 rounds, uint reward) public returns(bytes32) {
        bytes32 requestId = addPlan(modelCID, rounds, reward);

        // Builder has to provide the reward
        uint totalReward = calculateTotalReward(rounds, reward);
        token.transferFrom(msg.sender, address(this), totalReward);

        // Returning requestId mainly for testing purposes
        return requestId;
    }

    // Submit model
    function submitModel(string memory modelCID) public {
        saveModel(modelCID);

        // Send reward to node
        token.transfer(msg.sender, plans[numPlans - 1].nodeReward);
        plans[numPlans - 1].totalReward -= plans[numPlans - 1].nodeReward;
    }



    /** TODO:
     *    - Request join from builder
     *    - Sponsor projects
     *    - Request/Buy model
     *    - Validation
     *    - Settings public/private
     *        - possible to join for new nodes/builders
     */


    // Vote for removing fake node
    //   - Also must reestablish the secret
    // function voteNodeRemove(address _address) public onlyNode {
    //    // TODO: check if already voted
    //    // Increment vote count of node, kick if vote count above half
    // }
}
