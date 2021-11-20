from brownie import ContractManager, FELToken, ProjectContract, accounts, network

# Total supply times decimals
INITIAL_SUPPLY = 100000000000 * (10 ** 18)


def deploy_project():
    """Deploy test project contract."""
    project = ProjectContract.deploy(True, {"from": accounts[0]})
    project.createPlan(1, {"from": accounts[0]})


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        print(owner)
        print((owner))
        print(accounts)
        print(dir(accounts))
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner})
        ContractManager.deploy(feltoken, {"from": owner})

        deploy_project()

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner}, publish_source=True)
        ContractManager.deploy(feltoken, {"from": owner}, publish_source=True)
