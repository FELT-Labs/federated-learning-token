"""Module for loading contract ABI and address from build files."""
import json
from pathlib import Path

BUILD_FOLDER = Path(__file__).parent.parent / "build"

chain_id_map = {1337: "dev"}


def load_contracts(w3):
    """Load all deployed contracts on current chain from build folder."""
    chain_id = w3.eth.chain_id
    chain_id = chain_id_map.get(chain_id, chain_id)
    deploy_map = json.load((BUILD_FOLDER / "deployments/map.json").open())

    contracts = {}
    for key, address in deploy_map[chain_id].items():
        contract = json.load((BUILD_FOLDER / f"contracts/{key}.json").open())
        contracts[key] = w3.eth.contract(address=address[-1], abi=contract["abi"])

    return contracts
