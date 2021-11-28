"""Module for managing connection to chain and contracts."""
import hashlib
import json
from pathlib import Path

from coincurve import PrivateKey
from coincurve.keys import PublicKey
from ecies import decrypt, encrypt
from ecies.utils import aes_decrypt, aes_encrypt
from web3 import Web3

ETH_NODE = "http://127.0.0.1:8545"

BUILD_FOLDER = Path(__file__).parent.parent.parent / "build"

CHAIN_ID_MAP = {1337: "dev"}


def get_web3():
    """Get connection to web3."""
    return Web3(Web3.HTTPProvider(ETH_NODE))


def get_project_contract(w3):
    """Load all deployed project contract on current chain from build folder."""
    chain_id = w3.eth.chain_id
    chain_id = CHAIN_ID_MAP.get(chain_id, chain_id)
    deploy_map = json.load((BUILD_FOLDER / "deployments/map.json").open())

    contracts = {}
    for key, address in deploy_map[chain_id].items():
        contract = json.load((BUILD_FOLDER / f"contracts/{key}.json").open())
        contracts[key] = w3.eth.contract(address=address[-1], abi=contract["abi"])

    return contracts


def export_public_key(private_key):
    """Export public key for contract join request.

    Args:
        private_key (string): hex string representing private key

    Returns:
        tuple[bool, bytes]: representing parity and public key data
    """
    public = PrivateKey.from_hex(private_key).public_key.format(True)
    parity = bool(public[0] - 2)
    return (parity, public[1:])


def encrypt_secret(secret, parity, public_key):
    """Encrypt secret for public key defined in request (parity, public_key).

    Args:
        secret (bytes): secret shared key
        parity (bool): header byte, true represents 0x03, false represents 0x02
        public_key (bytes): rest of the public key

    Returns:
    """
    public_key_full = bytes([int(parity) + 2]) + public_key
    ciphertext = encrypt(public_key_full, secret)
    # Compress the empheral key
    emph_key = PublicKey(ciphertext[:65]).format(True)
    parity = bool(emph_key[0] - 2)

    ciphertext = emph_key[1:] + ciphertext[65:]
    # Split to 32 bytes blocks
    ciphertext = [ciphertext[i : i + 32] for i in range(0, len(ciphertext), 32)]
    return (parity, ciphertext)


def decrypt_secret(ciphertext, parity, private_key):
    """Decrypt encrypted secret using private key.

    Args:
        ciphertext (bytes): bytes representing the encrypted secret
        parity (bool): header byte, true represents 0x03, false represents 0x02
        private_key (string): hex string representing the private key

    Returns:
        bytes: decrypted shared secret
    """
    emph_key = PublicKey(bytes([int(parity) + 2]) + ciphertext[:32]).format(False)
    ciphertext_full = emph_key + ciphertext[32:]
    return decrypt(private_key, ciphertext_full)


def encrypt_bytes(bytes, secret):
    """Encrypt bytes (model) for storing in contract/IPFS."""
    return aes_encrypt(secret, bytes)


def decrypt_bytes(ciphertext, secret):
    """Decrypt bytes (model) stored in contract/IPFS."""
    return aes_decrypt(secret, ciphertext)


def get_current_secret(secret, entry_key_turn, key_turn):
    """Calculate shared secret at current state."""
    for _ in range(entry_key_turn, key_turn):
        secret = hashlib.sha256(secret).digest()
    return secret
