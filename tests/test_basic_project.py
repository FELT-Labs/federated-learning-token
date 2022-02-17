from nacl.public import PrivateKey
from scripts.helpful_scripts import get_account

from felt.core.web3 import (
    decrypt_bytes,
    decrypt_nacl,
    encrypt_bytes,
    encrypt_nacl,
    export_public_key,
)


def test_project_creation(accounts, project, token):
    """Test creating dummy project."""
    owner = get_account()
    token.increaseAllowance(project.address, 1000, {"from": owner})
    project.changeNodeStatus(True, {"from": owner})

    project.createPlan("testCID1", 10, 10, {"from": owner})
    assert project.numPlans() == 1
    assert token.balanceOf(project.address) == 100
    # This: .dict() works only if struct has more than 1 element
    assert project.plans(0).dict()["baseModelCID"] == "testCID1"

    project.abortPlan({"from": owner})

    project.createPlan("testCID2", 10, 10, {"from": owner})
    project.abortPlan({"from": owner})

    project.createPlan("testCID3", 10, 10, {"from": owner})
    assert project.numPlans() == 3
    assert project.plans(0).dict()["baseModelCID"] == "testCID1"
    assert project.plans(1).dict()["baseModelCID"] == "testCID2"
    assert project.plans(2).dict()["baseModelCID"] == "testCID3"


def test_encryption_mechanism(accounts, project):
    onwner = get_account()

    test_key = PrivateKey.generate()
    public_key = export_public_key(bytes(test_key).hex())

    # Fake request
    project.requestJoinNode(public_key, {"from": accounts[1]})
    length = project.getNodeRequestsLength()
    assert length == 1

    request = project.nodeRequests(length - 1).dict()
    secret = b"Test" * 8
    assert len(secret) == 32

    ciphertext = encrypt_nacl(request["publicKey"], secret)
    assert len(ciphertext) == 112

    # Accpet must be done by node or builder
    project.acceptNode(list(ciphertext), {"from": onwner})

    # Decryption process:
    #  1. Node gets index by address
    #  2. Access node values by index
    #  3. Decrypt secrets from node values using private key
    #  4. Use secret to encrypt models
    index = project.nodeState(request["_address"])
    assert index == 4

    encrypted_secret = b"".join(project.getNodeSecret(request["_address"]))
    private_key = bytes(test_key)
    final_secret = decrypt_nacl(private_key, encrypted_secret)
    assert final_secret == secret

    # Node encrypts message (model) for others
    msg = b"1337 test"
    msg_ct = encrypt_bytes(msg, final_secret)
    assert msg != msg_ct

    final_msg = decrypt_bytes(msg_ct, final_secret)
    assert final_msg == msg
