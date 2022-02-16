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
        // Shared secret between nodes
        // TODO: test if splitting into bytes32 is cheaper
        bytes[104] secret;
        // Entry state represents at which iteration node joined
        uint entryKeyTurn;
    }

    struct NodeJoinRequest {
        address _address;
        bytes32 publicKey;
    }

    // Mapping node address to index + 4 extra states:
    // 0 - no request
    // 1 - pending
    // 2 - declined
    // 3 <= i  - represents index i in node array as (i - 3)
    mapping(address => uint) public nodeState;
    Node[] public nodesArray;
    uint32 public activeNodes = 0;
    uint32 public keyTurn = 0; // Increment on every node join

    // Request are treated as a stack (for simplicity)
    NodeJoinRequest[] public nodeRequests;


    modifier onlyNode {
        require(
            isNode(msg.sender),
            "Only nodes are allowed to execute this."
        );
        _;
    }

    modifier onlyActiveNode {
        require(
            isNode(msg.sender) && nodesArray[nodeState[msg.sender] - 3].activated,
            "Only nodes that are active are allowed to execute this."
        );
        _;
    }

    /**
     * @notice Check if given address belongs to node
     * @param _address address to check
     */
    function isNode(address _address) public view returns(bool) {
        return nodeState[_address] >= 3;
    }

    function getNodesLength() public view returns(uint) {
        return nodesArray.length;
    }

    function getNodeRequestsLength() public view returns(uint) {
        return nodeRequests.length;
    }

    function getNodeSecret(uint index) public view returns(bytes[104] memory) {
        return nodesArray[index].secret;
    }

    /**
     * @notice Node can request to join providing their public key.
     * @param publicKey compressed public key value
     */
    function requestJoinNode(bytes32 publicKey) public {
        require(nodeState[msg.sender] == 0, "Address already made request.");
        nodeState[msg.sender] = 1;
        nodeRequests.push(NodeJoinRequest({
            _address: msg.sender,
            publicKey: publicKey
        }));
    }

    /**
     * @notice Accepting first request in the stack
     * @param secret sharing encrypted common secret for nodes

        TODO: Secret should be updated as hash of previous secret
              So that the node doesn't have access to previous models
        TODO: Should not accept node when plan is running
    */
    function acceptNode(bytes[104] memory secret) public onlyNode {
        require(nodeRequests.length > 0, "No request to process.");
        nodeState[nodeRequests[nodeRequests.length - 1]._address] = nodesArray.length + 3;

        keyTurn += 1;
        nodesArray.push(Node({
            _address: nodeRequests[nodeRequests.length - 1]._address,
            activated: true,
            secret: secret,
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
        nodeState[nodeRequests[nodeRequests.length - 1]._address] = 2;
        nodeRequests.pop();
    }

    /**
     * @notice Node activates itself
     */
    function activate() public onlyNode {
        require(
            !nodesArray[nodeState[msg.sender] - 3].activated,
            "Node is already active."
        );
        nodesArray[nodeState[msg.sender] - 3].activated = true;
    }

    /**
     * @notice Node deactivates itself
     * @dev onlyNode modifier is not required. It is checked inside _deactivateNode(...)
     */
    function deactivate() public {
        _deactivateNode(msg.sender);
    }

    /**
     * @notice Deactivate node by address
     * @dev We will use this later in the training plan - kick inactive nodes
     * @param _address address of node which should be deactivated
     */
    function _deactivateNode(address _address) internal {
        require(
            isNode(_address),
            "Address is not valid node."
        );
        require(
            nodesArray[nodeState[_address] - 3].activated,
            "Node is already inactive"
        );
        nodesArray[nodeState[_address] - 3].activated = true;
    }
}
