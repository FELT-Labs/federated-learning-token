// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

/**
 * @dev Reference data providers in the project and their requests to join the project
 */
contract DataProviders {
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
        // Entry state represents at which iteration node joined
        uint entryKeyTurn;
    }

    struct NodeJoinRequest {
        address _address;
        bool parity;
        bytes32 publicKey;
    }

    // Mapping node address to index + 4 extra states:
    // 0 - no request
    // 1 - pending
    // 2 - declined
    // 3 <= i  - represents index i in node array as (i - 3)
    mapping(address => uint) public nodes; // TODO rename to nodeState
    Node[] public nodesArray; // TODO rename to nodes
    uint32 public activeNodes = 0;
    uint32 public keyTurn = 0; // Increment on every node join

    // Request are treated as a stack (for simplicity)
    NodeJoinRequest[] public nodeRequests;


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

    function getNodesLength() public view returns(uint) {
        return nodesArray.length;
    }

    function getNodeRequestsLength() public view returns(uint) {
        return nodeRequests.length;
    }

    /**
     * @notice Node can request to join providing their public key.
     * @param parity based on header value (0x02/0x03 - false/true)
     * @param publicKey compressed public key value
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

    /**
     * @notice Accepting first request in the stack
     * @param parity header type
     * @param secret0 sharing encrypted common secret for nodes
     * @param secret1 sharing encrypted common secret for nodes
     * @param secret2 sharing encrypted common secret for nodes

        TODO: Secret should be updated as hash of previous secret
              So that the node doesn't have access to previous models
        TODO: Should not accept node when plan is running
    */
    function acceptNode(bool parity, bytes32 secret0, bytes32 secret1, bytes32 secret2) public onlyNode {
        require(nodeRequests.length > 0, "No request to process.");
        nodes[nodeRequests[nodeRequests.length - 1]._address] = nodesArray.length + 3;

        keyTurn += 1;
        nodesArray.push(Node({
            _address: nodeRequests[nodeRequests.length - 1]._address,
            activated: true,
            parity: parity,
            secret0: secret0,
            secret1: secret1,
            secret2: secret2,
            entryKeyTurn: keyTurn
        }));
        activeNodes += 1;
        nodeRequests.pop();
    }

    /**
     * @notice Declining first request in the stack
     */
    function declineNode() public onlyNode {
        require(nodeRequests.length > 0, "No request to process.");
        nodes[nodeRequests[nodeRequests.length - 1]._address] = 2;
        nodeRequests.pop();
    }
}
