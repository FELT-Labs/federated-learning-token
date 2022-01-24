import time

from felt.core.contracts import to_dict
from felt.core.web3 import decrypt_secret, export_public_key


def get_node_secret(project_contract, account):
    """Get shared secret for node represented by account."""
    index = project_contract.functions.nodeState(account.address).call()
    assert (
        index >= 3
    ), f"Node with this address ({account.address}) isn't approved by contract."

    node = project_contract.functions.nodesArray(index - 3).call()
    node = to_dict(node, "Node")

    ct = node["secret0"] + node["secret1"] + node["secret2"]
    return decrypt_secret(ct, node["parity"], account.private_key[2:]), node


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
            # Request ?
            print("You haven't requested access to project yet.")
            x = input("Do you want to join the project? [y/N]")
            if x.lower() in ["y", "yes", "ye"]:
                parity, public_key = export_public_key(account.private_key[2:])
                tx = project_contract.functions.requestJoinNode(
                    parity, public_key, {"from": account.__acct.address}
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

        # TODO: Check if node is in active state
        print("Node is ready for training.")
        return True
