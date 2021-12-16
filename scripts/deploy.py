from distutils.dir_util import copy_tree

from brownie import ContractManager, FELToken, accounts, config, network
from scripts.deploy_project import deploy_project, setup_test_project

# Total supply times decimals
INITIAL_SUPPLY = 100000000000 * (10 ** 18)


def main():
    owner = accounts.add(config["wallets"]["owner_key"])
    print(f"On network {network.show_active()}")

    # requires brownie account to have been created
    if network.show_active() == "development":
        node1 = accounts.add(config["wallets"]["node1_key"])
        node2 = accounts.add(config["wallets"]["node2_key"])

        # Provide initial supply
        accounts[0].transfer(owner, "30 ether")
        accounts[0].transfer(node1, "30 ether")
        accounts[0].transfer(node2, "30 ether")

        # add these accounts to metamask by importing private key
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner})
        ContractManager.deploy(feltoken, {"from": owner})

        project = deploy_project(owner)
        setup_test_project(project, owner)

    elif network.show_active() == "mumbai":
        # add these accounts to metamask by importing private key
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner}, publish_source=True)
        ContractManager.deploy(feltoken, {"from": owner}, publish_source=True)

    # Copy build dir for application
    copy_tree("build", "webapp/src/artifacts")
