from brownie import FELToken, ProjectContract, accounts, config
from sklearn.linear_model import LinearRegression

from felt.builder import upload_model


def create_plan(project, builder):
    ## DEFINE MODEL ###
    model = LinearRegression()
    cid = upload_model(model)

    ### PROVIDE REWARDS AND UPLOAD PLAN ###
    FELToken[-1].increaseAllowance(project.address, 1000, {"from": builder})
    project.createPlan(cid, 10, 10, {"from": builder})


def main():
    project = ProjectContract[-1]
    builder = accounts.add(config["wallets"]["owner_key"])
    create_plan(project, builder)
