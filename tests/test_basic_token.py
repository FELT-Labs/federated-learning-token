from scripts.helpful_scripts import get_account


def test_feltoken_deploy(token):
    """
    Test if the contract is correctly deployed.
    """
    assert token.symbol() == "FELT"


def test_feltoken_balance(accounts, token):
    """
    Test balance of owner.
    """
    owner = get_account()
    assert token.balanceOf(owner, {"from": owner}) == 1000


def test_feltoken_transfer(accounts, token):
    """
    Test transfer to other account.
    """
    owner = get_account()
    token.transfer(accounts[1], 10, {"from": owner})
    assert token.balanceOf(accounts[1], {"from": owner}) == 10
