// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "./Builders.sol";
import "./DataProviders.sol";

/**
 * @title Training Plans
 * @dev A contract that manages the training plans for the project.
 *
 * There is always only 1 plan running at a time
 * All the plans are stored on the blockchain
 */
contract TrainingPlans is VRFConsumerBase, Builders, DataProviders {
    // Chainlink VRF
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult; // TODO is this needed ?

    // Training Plans
    struct Round {
        bool completed;
        uint numSubmitted;
        mapping(address => string) modelsCID;
    }

    // Training plan defines instructions for training clients // TODO (data providers) ?
    struct TrainingPlan {
        // bytes data;
        address creator;
        address finalNode;
        uint32 randomSeed;

        // Base model uploaded by builder
        string baseModelCID;
        // Final model uploaded by finalNode
        string finalModelCID;

        // Secret for sharing with creator
        // TODO: maybe change to single array of 97 bytes
        bool parity;
        bytes32 secret0;
        bytes32 secret1;
        bytes32 secret2;

        // Training params
        uint32 numRounds;

        // Number of nodes and rewards in training
        uint numNodes;
        uint totalReward;
        uint nodeReward;

        uint keyTurn;

        // mapping (acting as array) of rounds // TODO why not array ?
        mapping(uint => Round) rounds;
    }

    // TODO why not array ?
    mapping(uint => TrainingPlan) public plans;
    uint32 public numPlans = 0;

    mapping(bytes32 => uint) requestToPlan;
    bool public isNewPlan = false;
    bool public isPlanRunning = false;
    uint32 public currentRound = 0;


    constructor(bytes32 _keyhash, address _vrfCoordinator, address _linkToken, uint256 _fee)
    VRFConsumerBase(_vrfCoordinator, _linkToken)
    {
        // Chainlink VRF
        keyHash = _keyhash;
        fee = _fee;
    }

    // TODO uint32 ?
    function calculateTotalReward(uint32 _rounds, uint _reward) internal view returns (uint) {
        return _rounds * _reward * activeNodes;
    }

    // TODO: Add Chainlink Keeper to close round if time elapses
    function saveModel(string memory modelCID) internal onlyNode {
        require(
            currentRound < plans[numPlans - 1].numRounds,
            "No more rounds to perform."
        );

        Round storage round = plans[numPlans - 1].rounds[currentRound];
        require(
            bytes(round.modelsCID[msg.sender]).length == 0,
            "Model already sent for this round"
        );

        // Store model CID and finish in case it is last
        round.modelsCID[msg.sender] = modelCID;
        round.numSubmitted += 1;
        if (round.numSubmitted >= activeNodes) {
            round.completed = true;
            currentRound += 1;
        }
    }

    function getRoundModel(uint roundIdx, address nodeAddress) public view returns(string memory) {
        require(numPlans > 0, "No training plans created");
        return plans[numPlans - 1].rounds[roundIdx].modelsCID[nodeAddress];
    }

    function addPlan(string memory modelCID, uint32 rounds, uint reward) internal onlyBuilder returns(bytes32) {
        require(!isNewPlan, "Another plan is already being executed");
        require(activeNodes > 0, "No active nodes to execute the plan");

        isNewPlan = true;
        currentRound = 0;

        TrainingPlan storage plan = plans[numPlans++];
        plan.creator = msg.sender;
        plan.baseModelCID = modelCID;
        plan.numRounds = rounds;
        plan.numNodes = activeNodes;
        plan.nodeReward = reward;
        plan.totalReward = calculateTotalReward(rounds, reward);
        plan.keyTurn = keyTurn;

        bytes32 requestId = getRandomNumber();
        requestToPlan[requestId] = numPlans - 1;

        // Returning requestId mainly for testing purposes
        return requestId;
    }

    // Abort plan
    function abortPlan() public {
        require(
            numPlans > 0 && plans[numPlans - 1].creator == msg.sender,
            "Only creator can abort the plan"
        );
        isNewPlan = false;
    }

    // Finish plan
    // IMPORTANT: Use combination of seed and secret to generate builder secret
    function finishPlan(
        bool parity,
        bytes32 secret0,
        bytes32 secret1,
        bytes32 secret2,
        string memory modelCID
    ) public onlyNode {
        TrainingPlan storage plan = plans[numPlans - 1];
        require(plan.finalNode == msg.sender, "Only pre-selected node can finish plan");

        plan.finalModelCID = modelCID;

        plan.parity = parity;
        plan.secret0 = secret0;
        plan.secret1 = secret1;
        plan.secret2 = secret2;

        isNewPlan = false;
        isPlanRunning = false;
    }


    // TODO: fugure out where to put this better
    /** Function node can become active/inactive */
    function changeNodeStatus(bool status) public onlyNode {
        require(!isNewPlan, "Node can't change status while plan running.");
        if (nodesArray[nodes[msg.sender] - 3].activated != status) {
            activeNodes = (status) ? activeNodes + 1 : activeNodes - 1;
        }
        nodesArray[nodes[msg.sender] - 3].activated = status;
    }


    /*** BLOCK: VRF handling ***/
    /**
     * Requests randomness
     */
    function getRandomNumber() private returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint idx = requestToPlan[requestId];
        if (isNewPlan && idx + 1 == numPlans) {
            isPlanRunning = true;

            // TODO: Deal better with inactive nodes so it is more fair
            uint256 i = randomness % nodesArray.length;
            for (; !nodesArray[i % nodesArray.length].activated; ++i) {}

            plans[idx].finalNode = nodesArray[i % nodesArray.length]._address;
            plans[idx].randomSeed = uint32(randomness);
        }
    }
}
