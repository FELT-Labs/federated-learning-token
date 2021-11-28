"""Module for deploying project contract."""
from brownie import FELToken, ProjectContract, accounts, config, network
from scripts.helpful_scripts import get_contract


def deploy_project(owner):
    """Deploy project contract."""
    token = FELToken[-1]
    keyhash = config["networks"][network.show_active()]["keyhash"]
    fee = config["networks"][network.show_active()]["fee"]
    vrf_coordinator = get_contract("vrf_coordinator")
    link_token = get_contract("link_token")

    return ProjectContract.deploy(
        token, keyhash, vrf_coordinator, link_token, fee, {"from": owner}
    )


def setup_test_project(project, token, owner):
    project.changeNodeStatus(True, {"from": owner})

    token.increaseAllowance(project.address, 1000, {"from": owner})
    project.createPlan("xxx", 10, 10, {"from": owner})


def main():
    owner = accounts.add(config["wallets"]["owner_key"])
    deploy_project(owner)
