import brownie
from scripts.helpful_scripts import get_account


def test_manager_activation(accounts, manager, token):
    """
    Test dummy activation of FL contract.
    """
    owner = get_account()
    fee = 200
    activation_amount = 100

    manager.setFee(fee, {"from": owner})

    token.increaseAllowance(manager.address, 500, {"from": owner})
    # Dummy activation (just tranfer to some address)
    manager.activateProject(
        accounts[2], "Name", "desc", activation_amount, {"from": owner}
    )

    assert token.balanceOf(owner) == 1000 - (fee + activation_amount)
    assert token.balanceOf(accounts[2]) == activation_amount


def test_manager_owner(accounts, manager):
    """Test transaction fail for non-owner accounts."""
    owner = get_account()
    manager.setFee(1, {"from": owner})
    assert manager.activationFee() == 1

    with brownie.reverts("Ownable: caller is not the owner"):
        manager.setFee(2, {"from": accounts[1]})
