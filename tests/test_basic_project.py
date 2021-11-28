from coincurve import PrivateKey

from felt.core.web3 import (
    decrypt_bytes,
    decrypt_secret,
    encrypt_bytes,
    encrypt_secret,
    export_public_key,
)


def test_project_creation(accounts, project, token):
    """Test creating dummy project."""
    token.increaseAllowance(project.address, 1000, {"from": accounts[0]})
    project.changeNodeStatus(True, {"from": accounts[0]})

    project.createPlan("testCID1", 10, 10, {"from": accounts[0]})
    assert project.getPlansLength() == 1
    assert token.balanceOf(project.address) == 100
    # This: .dict() works only if struct has more than 1 element
    assert project.plans(0).dict()["baseModelCID"] == "testCID1"

    project.abortPlan({"from": accounts[0]})

    project.createPlan("testCID2", 10, 10, {"from": accounts[0]})
    project.abortPlan({"from": accounts[0]})

    project.createPlan("testCID3", 10, 10, {"from": accounts[0]})
    assert project.getPlansLength() == 3
    assert project.plans(0).dict()["baseModelCID"] == "testCID1"
    assert project.plans(1).dict()["baseModelCID"] == "testCID2"
    assert project.plans(2).dict()["baseModelCID"] == "testCID3"


def test_encryption_mechanism(accounts, project):
    test_key = PrivateKey()
    parity, public_key = export_public_key(test_key.to_hex())

    # Fake request
    project.requestJoinNode(parity, public_key, {"from": accounts[1]})
    length = project.getNodeRequestsLength()
    assert length == 1

    request = project.nodeRequests(length - 1).dict()
    secret = b"Test" * 8
    assert len(secret) == 32

    parity, ciphertext = encrypt_secret(secret, request["parity"], request["publicKey"])
    assert len(ciphertext) == 3 and all(len(ciphertext[i]) == 32 for i in range(3))

    # Accpet must be done by node or builder
    project.acceptNode(parity, *ciphertext, {"from": accounts[0]})

    # Decryption process:
    #  1. Node gets index by address
    #  2. Access node values by index
    #  3. Decrypt secrets from node values using private key
    #  4. Use secret to encrypt models
    index = project.nodes(request["_address"])
    assert index == 4

    node = project.nodesArray(index - 3).dict()
    ct = node["secret0"] + node["secret1"] + node["secret2"]
    final_secret = decrypt_secret(ct, node["parity"], test_key.to_hex())
    assert final_secret == secret

    # Node encrypts message (model) for others
    msg = b"1337 test"
    msg_ct = encrypt_bytes(msg, final_secret)
    assert msg != msg_ct

    final_msg = decrypt_bytes(msg_ct, final_secret)
    assert final_msg == msg
