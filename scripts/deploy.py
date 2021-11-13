from brownie import ContractManager, FELToken, accounts, network

INITIAL_SUPPLY = 1000


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": accounts[0]})
        ContractManager.deploy(feltoken, {"from": accounts[0]})

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        feltoken = FELToken.deploy(INITIAL_SUPPLY, {"from": owner})
        ContractManager.deploy(feltoken, {"from": owner})
