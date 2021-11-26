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
    // Request are treated as a stack (for simplicity)
    NodeJoinRequest[] public nodeRequests;
    uint public activeNodes = 0;

    mapping(uint => TrainingPlan) public plans;
    uint numPlans = 0;

    bool public isNewPlan = false;
    bool public isPlanRunning = false;
    uint public currentRound = 0;
    // Settings public/private - possible to join for new nodes/builders
    bool public isPublic;


    constructor(bool _isPublic) {
        isPublic = _isPublic;
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
    function submitModel(string memory modelCID) public onlyNode {
        Round storage round = plans[numPlans - 1].rounds[currentRound];
        require(
            bytes(round.modelsCID[msg.sender]).length == 0,
            "Model already sent for this round"
        );

        round.modelsCID[msg.sender] = modelCID;
        round.numSubmitted += 1;
        if (round.numSubmitted >= activeNodes) {
            round.completed = true;
            currentRound += 1;
        }
    }

    /*** BLOCK: Plan managment ***/

    // Create plan
    function createPlan(string memory modelCID) public onlyBuilder {
        require(!isNewPlan, "Another plan is already being executed");
        isNewPlan = true;

        TrainingPlan storage plan = plans[numPlans++];
        plan.creator = msg.sender;
        plan.baseModelCID = modelCID;
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
    function finishPlan() public {
        isNewPlan = false;
    }


    // Request join builder

    // Deposit

    // Sponsor


    // Validation

    // Vote for removing fake node
    // Also must reestablish the secret
}
