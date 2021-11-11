def test_fetoken_deploy(token):
    """
    Test if the contract is correctly deployed.
    """
    assert token.symbol() == "FET"


def test_fetoken_balance(accounts, token):
    """
    Test if the storage variable can be changed.
    """
    assert token.balanceOf(accounts[0], {"from": accounts[0]}) == 1000
