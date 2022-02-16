"""Module for deploying project contract."""
from brownie import FELToken, ProjectContract, ProjectManager, accounts, config, network

from felt.core.web3 import encrypt_nacl, get_current_secret


def accept_node(owner):
    project = ProjectContract[-1]

    # Normaly secret shoud be decrypted from contract using owner private key
    # There is function get_node_secret(project, owner) which does that
    secret = b"Initial secret must be 32 bytes."
    assert len(secret) == 32

    # Add two node for testing:
    # Accept the request (share secret encrypted by one more than current keyTurn)
    turn_secret = get_current_secret(secret, 0, project.keyTurn() + 1)

    request = project.nodeRequests(project.getNodeRequestsLength() - 1).dict()
    ciphertext = encrypt_nacl(request["publicKey"], turn_secret)
    project.acceptNode(list(ciphertext), {"from": owner})


def main():
    owner = accounts.add(config["wallets"]["owner_key"])
    accept_node(owner)
