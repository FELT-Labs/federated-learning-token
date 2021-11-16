"""Module for loading contract ABI and address from build files."""
import json
from pathlib import Path

BUILD_FOLDER = Path(__file__).parent.parent / "build"

chain_id_map = {1337: "dev"}


def load_contracts(chain_id):
    """Load all deployed contracts on current chain from build folder."""
    chain_id = chain_id_map.get(chain_id, chain_id)
    deploy_map = json.load((BUILD_FOLDER / "deployments/map.json").open())

    contracts = {key: {} for key in deploy_map[chain_id]}
    for key, address in deploy_map[chain_id].items():
        contracts[key]["address"] = address[-1]
        contract = json.load((BUILD_FOLDER / f"contracts/{key}.json").open())
        contracts[key]["abi"] = contract["abi"]

    return contracts
