from brownie import ContractManager, FELToken, ProjectContract, accounts, network

# Total supply times decimals
INITIAL_SUPPLY = 100000000000 * (10 ** 18)


def deploy_project(token, owner):
    """Deploy test project contract."""
    project = ProjectContract.deploy(token, True, {"from": owner})

    project.changeNodeStatus(True, {"from": accounts[0]})

    token.increaseAllowance(project.address, 1000, {"from": owner})
    project.createPlan("xxx", 10, 10, {"from": owner})


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner})
        ContractManager.deploy(feltoken, {"from": owner})

        deploy_project(feltoken, owner)

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner}, publish_source=True)
        ContractManager.deploy(feltoken, {"from": owner}, publish_source=True)
