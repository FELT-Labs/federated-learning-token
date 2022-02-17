"""Module for deploying project contract."""
from brownie import FELToken, ProjectContract, ProjectManager, accounts, config, network

from felt.core.web3 import (
    decrypt_nacl,
    encrypt_nacl,
    export_public_key,
    get_current_secret,
)


def deploy_project(owner):
    """Deploy project contract."""
    token = FELToken[-1]

    # Using dummy test secret
    secret = b"Initial secret must be 32 bytes."
    assert len(secret) == 32

    public_key = export_public_key(owner.private_key[2:])
    ciphertext = encrypt_nacl(public_key, secret)
    project = ProjectContract.deploy(
        token, public_key, list(ciphertext), {"from": owner}
    )

    manager = ProjectManager[-1]
    manager.activateProject(
        project.address, "Test Project", "This is great project...", 0, {"from": owner}
    )

    return project


def setup_test_project(project, owner):
    encrypted_secret = b"".join(project.getNodeSecret(owner))
    secret = decrypt_nacl(bytes.fromhex(owner.private_key[2:]), encrypted_secret)

    # Add two node for testing:
    for i in [1, 2]:
        node = accounts.add(config["wallets"][f"node{i}_key"])
        public_key = export_public_key(node.private_key[2:])
        project.requestJoinNode(public_key, {"from": node})

        # Accept the request (share secret encrypted by one more than current keyTurn)
        turn_secret = get_current_secret(secret, 0, project.keyTurn() + 1)

        request = project.nodeRequests(project.getNodeRequestsLength() - 1).dict()
        ciphertext = encrypt_nacl(request["publicKey"], turn_secret)
        project.acceptNode(list(ciphertext), {"from": owner})


def main():
    owner = accounts.add(config["wallets"]["owner_key"])
    deploy_project(owner)
