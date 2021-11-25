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
        bool complete;
        string[] modelsCID;
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
        uint numClinets;
        uint totalReward;

        // Array of rounds
        Round[] rounds;
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

    TrainingPlan[] public plans;
    TrainingPlan public latestPlan;

    bool public isNewPlan = false;
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


    function getPlansLength() public view returns(uint) {
        return plans.length;
    }

    /* BLOCK: Functions related to node join */

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
        nodesArray[nodes[msg.sender] - 3].activated = status;
    }



    // Request join builder

    // Deposit

    // Sponsor

    // Create plan
    function createPlan(string memory modelCID) public onlyBuilder {
        require(!isNewPlan, "Another plan is already being executed");
        isNewPlan = true;

        latestPlan.creator = msg.sender;
        latestPlan.baseModelCID = modelCID;
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
