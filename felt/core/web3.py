"""Module for managing connection to chain and contracts."""
import hashlib
import json
from pathlib import Path

from coincurve import PrivateKey
from coincurve.keys import PublicKey
from ecies import decrypt, encrypt
from ecies.utils import aes_decrypt, aes_encrypt
from web3 import Web3
from web3.gas_strategies.time_based import medium_gas_price_strategy
from web3.middleware import construct_sign_and_send_raw_middleware

BUILD_FOLDER = Path(__file__).parent.parent.parent / "build"

CHAIN_ID_MAP = {
    1337: "http://127.0.0.1:8545",
    80001: "https://rpc-mumbai.maticvigil.com/v1/b5019eba066c735d9bd10b800ca694ed720e8d87",
}


def get_web3(account, chain_id):
    """Get connection to web3."""
    w3 = Web3(Web3.HTTPProvider(CHAIN_ID_MAP[chain_id]))
    w3.eth.set_gas_price_strategy(medium_gas_price_strategy)
    w3.middleware_onion.add(construct_sign_and_send_raw_middleware(account._acct))
    w3.eth.default_account = account._acct.address
    return w3


def get_project_contract(w3, address):
    """Load project contract on current chain from build folder."""
    contract = json.load((BUILD_FOLDER / f"contracts/ProjectContract.json").open())
    return w3.eth.contract(address=address, abi=contract["abi"])


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
