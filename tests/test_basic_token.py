def test_feltoken_deploy(token):
    """
    Test if the contract is correctly deployed.
    """
    assert token.symbol() == "FELT"


def test_feltoken_balance(accounts, token):
    """
    Test balance of owner.
    """
    assert token.balanceOf(accounts[0], {"from": accounts[0]}) == 1000


def test_feltoken_transfer(accounts, token):
    """
    Test transfer to other account.
    """
    token.transfer(accounts[1], 10, {"from": accounts[0]})
    assert token.balanceOf(accounts[1], {"from": accounts[0]}) == 10
