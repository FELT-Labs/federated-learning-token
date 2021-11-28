from brownie import FELToken, ProjectContract, accounts, config, network
from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
    fund_with_link,
    get_account,
    get_contract,
)
from sklearn.linear_model import LinearRegression

from felt.builder import upload_model


def create_plan(project, builder):
    # Add LINK to contract for testing
    fund_with_link(project.address)

    ## DEFINE MODEL ###
    model = LinearRegression()
    cid = upload_model(model)

    ### PROVIDE REWARDS AND UPLOAD PLAN ###
    FELToken[-1].increaseAllowance(project.address, 1000, {"from": builder})
    requestId = project.createPlan(cid, 10, 10, {"from": builder})

    # Simulate the VRF on local chain
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        get_contract("vrf_coordinator").callBackWithRandomness(
            requestId.return_value, 777, project.address, {"from": get_account()}
        )


def main():
    project = ProjectContract[-1]
    builder = accounts.add(config["wallets"]["owner_key"])
    create_plan(project, builder)
