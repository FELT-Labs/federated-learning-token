// SPDX-License-Identifier: GPL3
/*
   Project contract manages references to data providers (nodes) and
   scientiests (plan creators). Data providers must watch this contract
   and execute new plans. This contract is instantiated for each project
   and can be edited for individual needs.

   TODO: Make interface/abstract project contract
*/
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "./Token.sol";


contract ProjectContract is VRFConsumerBase {
    FELToken private token;

    // Chainlink VRF
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    struct Round {
        bool completed;
        uint numSubmitted;
        mapping(address => string) modelsCID;
    }

    // Training plan defines instructions for training clients
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

        // Number of clients and rewards in training
        uint numNodes;
        uint totalReward;
        uint nodeReward;

        // mapping (acting as array) of rounds
        mapping(uint => Round) rounds;
    }

    // Data provider entity (node)
    struct Node {
        address _address;
        bool activated;
        // Shared secret between nodes:
        // TODO: maybe change to single array of 97 bytes
        bool parity;
        bytes32 secret0;
        bytes32 secret1;
        bytes32 secret2;
    }

    struct NodeJoinRequest {
        address _address;
        bool parity;
        bytes32 publicKey;
    }

    // Plan designer entity (builder)
    struct Builder {
        address _address;
    }

    mapping(address => Builder) builders;

    // Mapping node address to index + 4 extra states:
    // 0 - no request
    // 1 - pending
    // 2 - declined
    // 3 <= i  - represents index i in node array as (i - 3)
    mapping(address => uint) public nodes;
    Node[] public nodesArray;
    uint public activeNodes = 0;

    // Request are treated as a stack (for simplicity)
    NodeJoinRequest[] public nodeRequests;

    mapping(uint => TrainingPlan) public plans;
    uint numPlans = 0;

    mapping(bytes32 => uint) requestToPlan;
    bool public isNewPlan = false;
    bool public isPlanRunning = false;
    uint public currentRound = 0;
    // TODO: Settings public/private - possible to join for new nodes/builders

    constructor(
        FELToken _token,
        bytes32 _keyhash,
        address _vrfCoordinator,
        address _linkToken,
        uint256 _fee
    ) 
        VRFConsumerBase(
            _vrfCoordinator, // VRF Coordinator
            _linkToken  // LINK Token
        )
    {
        token = _token;

        // VRF
        keyHash = _keyhash;
        fee = _fee;       

        // Set creator both as builder and node, might be changed in future
        builders[msg.sender] = Builder({
            _address: msg.sender
        });

        nodes[msg.sender] = 3;
        nodesArray.push(Node({
            _address: msg.sender,
            activated: false,
            parity: false, 
            secret0: 0,
            secret1: 0,
            secret2: 0
        }));
    }


    modifier onlyBuilder {
        require(
            builders[msg.sender]._address != address(0),
            "Only builders are allowed to execute this."
        );
        _;
    }


    modifier onlyNode {
        require(
            nodes[msg.sender] >= 3,
            "Only nodes are allowed to execute this."
        );
        _;
    }


    modifier onlyActiveNode {
        require(
            nodes[msg.sender] >= 3 && nodesArray[nodes[msg.sender] - 3].activated,
            "Only nodes that are active are allowed to execute this."
        );
        _;
    }


    function getPlansLength() public view returns(uint) {
        return numPlans;
    }

    /*** BLOCK: Functions related to node join ***/

    function getNodeRequestsLength() public view returns(uint) {
        return nodeRequests.length;
    }

    /** Node can request to join providing their public key.
        @param parity based on header value (0x02/0x03 - false/true)
        @param publicKey compressed public key value
     */
    function requestJoinNode(bool parity, bytes32 publicKey) public {
        require(nodes[msg.sender] == 0, "Address already made request.");
        nodes[msg.sender] = 1;
        nodeRequests.push(NodeJoinRequest({
            _address: msg.sender,
            parity: parity,
            publicKey: publicKey
        }));
    }

    /** Accepting first request in the queue
        @param parity header type
        @param secret0 sharing encrypted common secret for nodes
        @param secret1 sharing encrypted common secret for nodes
        @param secret2 sharing encrypted common secret for nodes

        TODO: Secret should be updated as hash of previous secret
              So that the node doesn't have access to previous models
    */
    function acceptNode(
        bool parity,
        bytes32 secret0,
        bytes32 secret1,
        bytes32 secret2
    ) public onlyNode {
        require(nodeRequests.length > 0, "No request to process.");
        nodes[nodeRequests[nodeRequests.length - 1]._address] = nodesArray.length + 3;

        nodesArray.push(Node({
            _address: nodeRequests[nodeRequests.length - 1]._address,
            activated: true,
            parity: parity,
            secret0: secret0,
            secret1: secret1,
            secret2: secret2
        }));
        activeNodes += 1;
        nodeRequests.pop();
    }

    /** Declining first request in the queue */
    function declineNode() public onlyNode {
        require(nodeRequests.length > 0, "No request to process.");
        nodes[nodeRequests[nodeRequests.length - 1]._address] = 2;
        nodeRequests.pop();
    }

    /** Function node can become active/inactive */
    function changeNodeStatus(bool status) public onlyNode {
        require(!isNewPlan, "Node can't change status while plan running.");
        if (nodesArray[nodes[msg.sender] - 3].activated != status) {
            activeNodes = (status) ? activeNodes + 1 : activeNodes - 1;
        }
        nodesArray[nodes[msg.sender] - 3].activated = status;
    }


    /*** BLOCK: Functions for training plan execution ***/
    // TODO: Add Chainlink Keeper to close round if time elapses
    function submitModel(string memory modelCID) public onlyNode {
        require(
            currentRound < plans[numPlans - 1].numRounds,
            "No more rounds to perform."
        );

        Round storage round = plans[numPlans - 1].rounds[currentRound];
        require(
            bytes(round.modelsCID[msg.sender]).length == 0,
            "Model already sent for this round"
        );

        // Send reward to node
        token.transfer(msg.sender, plans[numPlans - 1].nodeReward);
        plans[numPlans - 1].totalReward -= plans[numPlans - 1].nodeReward;
        // Store model CID and finish in case it is last
        round.modelsCID[msg.sender] = modelCID;
        round.numSubmitted += 1;
        if (round.numSubmitted >= activeNodes) {
            round.completed = true;
            currentRound += 1;
        }
    }

    /*** BLOCK: Plan managment ***/

    // Create plan
    function createPlan(string memory modelCID, uint32 rounds, uint reward) public onlyBuilder {
        require(!isNewPlan, "Another plan is already being executed");
        require(activeNodes > 0, "No active nodes to execute the plan");

        isNewPlan = true;
        currentRound = 0;

        // Builder has to provide the reward
        uint totalReward = rounds * reward * activeNodes;
        token.transferFrom(msg.sender, address(this), totalReward);

        TrainingPlan storage plan = plans[numPlans++];
        plan.creator = msg.sender;
        plan.baseModelCID = modelCID;
        plan.numRounds = rounds;
        plan.numNodes = activeNodes;
        plan.nodeReward = reward;
        plan.totalReward = totalReward;

        requestToPlan[getRandomNumber()] = numPlans - 1;
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


    /** TODO:
     *    - Request join from builder
     *    - Sponsor projects
     *    - Request/Buy model
     *    - Validation
     */


    // Vote for removing fake node
    // Also must reestablish the secret


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
