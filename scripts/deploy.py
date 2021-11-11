from brownie import FELToken, accounts, network


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        FELToken.deploy(1000, {"from": accounts[0]})

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        FELToken.deploy(1000, {"from": owner})
