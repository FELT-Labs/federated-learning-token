from brownie import FEToken, accounts, network


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        FEToken.deploy(1000, {"from": accounts[0]})

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        FEToken.deploy(1000, {"from": owner})
