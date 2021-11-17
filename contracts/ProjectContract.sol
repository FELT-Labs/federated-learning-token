// SPDX-License-Identifier: GPL3
/*
   Project contract manages references to data providers (nodes) and
   scientiests (plan creators). Data providers must watch this contract
   and execute new plans. This contract is instantiated for each project
   and can be edited for individual needs.

   TODO: Make interface/abstract project contract
*/
pragma solidity ^0.8.0;

contract ProjectContract {
    // Training plan defines instructions for training clients
    struct TrainingPlan {
        // bytes data;
        address creator;
        uint reward;
        uint num;
    }

    // Data provider entity (node)
    struct Node {
        address _address;
    }

    // Plan designer entity (builder)
    struct Builder {
        address _address;
    }

    mapping(address => Builder) builders;

    Node[] public nodes;

    TrainingPlan[] public plans;
    TrainingPlan public latestPlan;

    bool public isNewPlan = false;
    bool public isPublic;


    constructor(bool _isPublic) {
        isPublic = _isPublic;
        builders[msg.sender] = Builder({
            _address: msg.sender
        });
    }


    modifier onlyBuilder {
        require(
            builders[msg.sender]._address != address(0),
            "Only builders are allowed to execute this."
        );
        _;
    }



    function getPlansLength() public view returns(uint) {
        return plans.length;
    }

    // Request join node

    // Request join scientist

    // Deposit

    // Sponsor

    // Create plan
    function createPlan(uint num) public onlyBuilder {
        require(!isNewPlan, "Another plan is already being executed");
        isNewPlan = true;

        latestPlan.creator = msg.sender;
        latestPlan.num = num;
        latestPlan.reward = num + 5;
        plans.push(latestPlan);
    }

    // Abort plan
    function abortPlan() public {
        require(latestPlan.creator == msg.sender, "Only creator can abort the plan");
        isNewPlan = false;
    }

    // Finish plan
    function finishPlan() public {
        isNewPlan = false;
    }

    // Settings public/private (clients always private?)

    // Validation

    // Vote for fake client
}
