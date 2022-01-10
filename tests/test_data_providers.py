import brownie
from coincurve import PrivateKey
from scripts.helpful_scripts import get_account

from felt.core.web3 import encrypt_secret, export_public_key


def test_node_join_request(accounts, project):
    # Arrange
    node_address = accounts[0]
    test_key = PrivateKey()
    parity, public_key = export_public_key(test_key.to_hex())

    # Act
    project.requestJoinNode(parity, public_key, {"from": node_address})
    request = project.nodeRequests(0).dict()

    # Assert
    assert request["parity"] == parity
    assert request["publicKey"].hex() == public_key.hex()
    assert request["_address"] == node_address
    assert project.getNodeRequestsLength() == 1
    assert project.nodeState(node_address) == 1
    assert project.activeNodes() == 0


def test_accept_node(accounts, project, token):
    # Arrange
    owner = get_account()
    node_address = accounts[0]
    test_key = PrivateKey()
    parity, public_key = export_public_key(test_key.to_hex())

    # Act
    project.requestJoinNode(parity, public_key, {"from": node_address})
    request = project.nodeRequests(0).dict()

    secret = b"Test" * 8
    public_key = brownie.convert.to_bytes(request["publicKey"], type_str="bytes32")
    parity, ciphertext = encrypt_secret(secret, request["parity"], public_key)

    with brownie.reverts("Only nodes are allowed to execute this."):
        project.acceptNode(parity, *ciphertext, {"from": node_address})

    project.acceptNode(parity, *ciphertext, {"from": owner})

    # Assert
    assert project.getNodeRequestsLength() == 0
    assert project.getNodesLength() == 2  # owner + new node
    assert project.nodeState(node_address) == 4
    assert project.activeNodes() == 1  # only new node is active


def test_decline_node(accounts, project, token):
    # Arrange
    owner = get_account()
    node_address = accounts[0]
    test_key = PrivateKey()
    parity, public_key = export_public_key(test_key.to_hex())

    # Act
    project.requestJoinNode(parity, public_key, {"from": node_address})

    with brownie.reverts("Only nodes are allowed to execute this."):
        project.declineNode({"from": node_address})

    project.declineNode({"from": owner})

    # Assert
    assert project.getNodeRequestsLength() == 0
    assert project.getNodesLength() == 1  # only owner
    assert project.nodeState(node_address) == 2
    assert project.activeNodes() == 0


def test_cannot_double_join(accounts, project, token):
    # Arrange
    owner = get_account()
    node_address = accounts[0]
    test_key = PrivateKey()
    parity, public_key = export_public_key(test_key.to_hex())

    # Act
    project.requestJoinNode(parity, public_key, {"from": node_address})

    with brownie.reverts("Address already made request."):
        project.requestJoinNode(parity, public_key, {"from": node_address})

    project.declineNode({"from": owner})

    # Assert
    with brownie.reverts("Address already made request."):
        project.requestJoinNode(parity, public_key, {"from": node_address})

    assert project.getNodeRequestsLength() == 0
    assert project.getNodesLength() == 1  # only owner
    assert project.nodeState(node_address) == 2
