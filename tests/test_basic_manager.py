import brownie


def test_manager_activation(accounts, manager, token):
    """
    Test dummy activation of FL contract.
    """
    fee = 200
    activation_amount = 100

    manager.setFee(fee, {"from": accounts[0]})

    token.increaseAllowance(manager.address, 500, {"from": accounts[0]})
    # Dummy activation (just tranfer to some address)
    manager.activateContract(accounts[2], activation_amount, {"from": accounts[0]})

    assert token.balanceOf(accounts[0]) == 1000 - (fee + activation_amount)
    assert token.balanceOf(accounts[2]) == activation_amount


def test_manager_owner(accounts, manager):
    """Test transaction fail for non-owner accounts."""
    manager.setFee(1, {"from": accounts[0]})
    assert manager.activationFee() == 1

    with brownie.reverts("Ownable: caller is not the owner"):
        manager.setFee(2, {"from": accounts[1]})
