import time

from felt.core.contracts import to_dict
from felt.core.prompts import yes_no_prompt
from felt.core.web3 import decrypt_nacl, export_public_key


def get_node(project_contract, account):
    """Get node data for given account."""
    index = project_contract.functions.nodeState(account.address).call()
    assert (
        index >= 3
    ), f"Node with this address ({account.address}) isn't approved by contract."

    node = project_contract.functions.nodesArray(index - 3).call()
    return to_dict(node, "Node")


def get_node_secret(project_contract, account):
    """Get shared secret for node represented by account."""
    index = project_contract.functions.nodeState(account.address).call()
    secret = b"".join(project_contract.functions.getNodeSecret(index - 3).call())
    private_key = bytes.fromhex(account.private_key[2:])
    return decrypt_nacl(private_key, secret)


def check_node_isactive(w3, project_contract, account):
    """Check if accepted node has active status."""
    node = get_node(project_contract, account)
    if not node["activated"]:
        print("Node with this account is set as inactive.")
        if yes_no_prompt("Do you want to activate the node?", default=False):
            # TODO: Add this once contract updated
            tx = project_contract.functions.activate().transact(
                {"from": account._acct.address, "gasPrice": w3.eth.gas_price},
            )
            w3.eth.wait_for_transaction_receipt(tx)
            print("Node activated.")
        else:
            print("Node remains inactive.")
            return False

    return True


def check_node_state(w3, project_contract, account):
    """Check node state depending on a state perform action:

    State:
        0 - no access request - ask if user wants to join:
                                yes - perform join, got to state 1
                                no - return False
        1 - pending - notify about pending application, wait for state update
        2 - declined - return False
        3+ - accepted - return True

    Args:
        project_contract (Contract): project contract instance
        account (Account): brownie account instance

    Returns:
        (bool): True if account can participate as data provider in project
    """
    while True:
        index = project_contract.functions.nodeState(account.address).call()
        if index == 0:
            # Request join as data provider
            print("You haven't requested access to project yet.")
            if yes_no_prompt("Do you want to join the project?", default=False):
                public_key = export_public_key(account.private_key[2:])
                tx = project_contract.functions.requestJoinNode(public_key).transact(
                    {"from": account._acct.address, "gasPrice": w3.eth.gas_price},
                )
                w3.eth.wait_for_transaction_receipt(tx)
                print("Request to join sent. Waiting to be accepted.")
                continue
            else:
                print("You decided not to join project.")
                return False

        elif index == 1:
            print("Waiting to be accepted.")
            time.sleep(10)
            continue

        elif index == 2:
            print("Node was declined from participation in this project.")
            return False

        # Check if node is set to active
        return check_node_isactive(w3, project_contract, account)
