from coincurve import PrivateKey
from web3.datastructures import T

from felt.core.web3 import (
    decrypt_endpoint,
    decrypt_secret,
    encrypt_endpoint,
    encrypt_secret,
    export_public_key,
)


def test_project_creation(accounts, project):
    """Test creating dummy project."""
    project.createPlan(1, {"from": accounts[0]})
    assert project.getPlansLength() == 1
    # This: .dict() works only if struct has more than 1 element
    assert project.latestPlan().dict()["num"] == 1

    project.abortPlan({"from": accounts[0]})

    project.createPlan(2, {"from": accounts[0]})
    project.abortPlan({"from": accounts[0]})

    project.createPlan(3, {"from": accounts[0]})
    assert project.getPlansLength() == 3
    assert project.plans(0).dict()["num"] == 1
    assert project.plans(1).dict()["num"] == 2
    assert project.plans(2).dict()["num"] == 3
    assert project.latestPlan().dict()["num"] == 3


def test_encryption_mechanism(accounts, project, w3):
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
    assert len(ciphertext) == 3 * 32

    # Accpet must be done by node or builder
    ciphertext = [ciphertext[i : i + 32] for i in range(0, len(ciphertext), 32)]
    project.acceptNode(parity, *ciphertext, {"from": accounts[0]})

    # Decryption process:
    #  1. Node gets index by address
    #  2. Access node values by index
    #  3. Decrypt secrets from node values using private key
    #  4. Use secret to encrypt it's own endpoint
    index = project.nodes(request["_address"])
    assert index == 4

    node = project.nodesArray(index - 3).dict()
    ct = node["secret0"] + node["secret1"] + node["secret2"]
    final_secret = decrypt_secret(ct, node["parity"], test_key.to_hex())
    assert final_secret == secret

    # Node encrypts endpoint and activates itself
    endpoint = b"127.0.0.1:8000/test"
    endpoint_ct = encrypt_endpoint(endpoint, final_secret)
    project.activateNode(endpoint_ct, {"from": accounts[1]})
    assert endpoint != endpoint_ct

    # Check the endpoint and decrypt it
    node = project.nodesArray(index - 3).dict()
    assert bytes(node["endpoint"]) == endpoint_ct

    final_endpoint = decrypt_endpoint(node["endpoint"], final_secret)
    assert final_endpoint == endpoint
