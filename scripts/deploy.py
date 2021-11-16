from brownie import ContractManager, FELToken, ProjectContract, accounts, network

# Total supply times decimals
INITIAL_SUPPLY = 100000000000 * (10 ** 18)


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": accounts[0]})
        ContractManager.deploy(feltoken, {"from": accounts[0]})

        # Deploy one test project contract:
        project = ProjectContract.deploy(True, {"from": accounts[0]})
        project.createPlan(1, {"from": accounts[0]})
        print(project.plans(0).num, type(project.plans(0)))

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner})
        ContractManager.deploy(feltoken, {"from": owner})
