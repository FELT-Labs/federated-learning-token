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
        uint num;
        uint x;
    }

    TrainingPlan[] public plans;
    TrainingPlan public latestPlan;

    bool public isNewPlan = false;
    bool public isPublic;

    constructor(bool _isPublic) {
        isPublic = _isPublic;
    }

    function getPlansLength() public view returns(uint) {
        return plans.length;
    }

    // Request join node

    // Request join scientist

    // Deposit

    // Sponsor

    // Create plan
    function createPlan(uint num) public {
        isNewPlan = true;

        latestPlan.num = num;
        latestPlan.x = num + 5;
        plans.push(latestPlan);
    }

    // Abort plan
    function abortPlan() public {
        // Check that it is plan creator

    }

    // Finish plan

    // Settings public/private (clients always private?)

    // Validation

    // Vote for fake client
}
