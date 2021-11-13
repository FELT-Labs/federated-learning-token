import pytest


@pytest.fixture(autouse=True)
def setup(fn_isolation):
    """
    Isolation setup fixture.
    This ensures that each test runs against the same base environment.
    """
    pass


@pytest.fixture(scope="module")
def token(accounts, FELToken):
    """
    Yield a `Contract` object for the FELToken contract.
    """
    yield FELToken.deploy(1000, {"from": accounts[0]})


@pytest.fixture(scope="module")
def manager(accounts, ContractManager, token):
    """
    Yield a `Contract` object for the ContractManager contract.
    """
    yield ContractManager.deploy(token, {"from": accounts[0]})
