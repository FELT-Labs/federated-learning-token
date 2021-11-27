import pytest
from web3 import Web3


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


@pytest.fixture(scope="module")
def project(accounts, ProjectContract, token):
    """
    Yield a `Contract` object for the ProjectContract contract.
    """
    yield ProjectContract.deploy(token, True, {"from": accounts[0]})


@pytest.fixture(scope="module")
def w3():
    return Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
