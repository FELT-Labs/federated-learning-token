"""Module for deploying project contract."""
from brownie import FELToken, ProjectContract, ProjectManager, accounts, config, network

from felt.core.web3 import encrypt_secret, export_public_key, get_current_secret


def deploy_project(owner):
    """Deploy project contract."""
    token = FELToken[-1]

    parity, public_key = export_public_key(owner.private_key[2:])
    project = ProjectContract.deploy(token, parity, public_key, {"from": owner})

    manager = ProjectManager[-1]
    manager.activateProject(
        project.address, "Test Project", "This is great project...", 0, {"from": owner}
    )

    return project


def setup_test_project(project, owner):

    secret = b"Initial secret must be 32 bytes."
    assert len(secret) == 32

    # Add two node for testing:
    for i in [1, 2]:
        node = accounts.add(config["wallets"][f"node{i}_key"])
        parity, public_key = export_public_key(node.private_key[2:])
        project.requestJoinNode(parity, public_key, {"from": node})

        # Accept the request (share secret encrypted by one more than current keyTurn)
        turn_secret = get_current_secret(secret, 0, project.keyTurn() + 1)

        request = project.nodeRequests(project.getNodeRequestsLength() - 1).dict()
        parity, ciphertext = encrypt_secret(
            turn_secret, request["parity"], request["publicKey"]
        )
        project.acceptNode(parity, *ciphertext, {"from": owner})


def main():
    owner = accounts.add(config["wallets"]["owner_key"])
    project = deploy_project(owner)
