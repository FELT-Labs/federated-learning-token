import brownie
from coincurve import PrivateKey
from scripts.helpful_scripts import get_account

from felt.core.web3 import encrypt_secret, export_public_key


def test_owner_is_builder(project):
    # Arrange
    owner = get_account()

    # Act
    builder = project.builders(owner).dict()

    # Assert
    assert builder["_address"] == owner


def test_set_builder_public_key(accounts, project):
    # Arrange
    owner = get_account()
    non_builder = accounts[0]

    # Act
    test_key = PrivateKey()
    parity, public_key = export_public_key(test_key.to_hex())
    project.setBuilderPublickey(parity, public_key, {"from": owner})
    builder = project.builders(owner).dict()

    # Assert
    assert builder["parity"] == parity
    assert builder["publicKey"].hex() == public_key.hex()
    assert builder["_address"] == owner

    with brownie.reverts("Builder not set"):
        project.setBuilderPublickey(parity, public_key, {"from": non_builder})
