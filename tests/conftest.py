import pytest


@pytest.fixture(autouse=True)
def setup(fn_isolation):
    """
    Isolation setup fixture.
    This ensures that each test runs against the same base environment.
    """
    pass


@pytest.fixture(scope="module")
def token(accounts, FEToken):
    """
    Yield a `Contract` object for the FEToken contract.
    """
    yield FEToken.deploy(1000, {"from": accounts[0]})
