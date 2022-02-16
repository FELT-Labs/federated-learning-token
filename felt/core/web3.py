"""Module for managing connection to chain and contracts."""
import hashlib
import json
from pathlib import Path

from brownie.network.account import LocalAccount

# TODO: Replace the encryption functions with something else?
from ecies.utils import aes_decrypt, aes_encrypt
from eth_typing.evm import Address
from nacl.public import Box, PrivateKey, PublicKey
from web3 import Web3
from web3.contract import Contract
from web3.gas_strategies.time_based import medium_gas_price_strategy
from web3.middleware import construct_sign_and_send_raw_middleware

BUILD_FOLDER = Path(__file__).parent.parent.parent / "build"

CHAIN_ID_MAP = {
    1337: "http://127.0.0.1:8545",
    80001: "https://rpc-mumbai.maticvigil.com/v1/b5019eba066c735d9bd10b800ca694ed720e8d87",
}


def get_web3(account: LocalAccount, chain_id: int) -> Web3:
    """Get connection to web3."""
    w3 = Web3(Web3.HTTPProvider(CHAIN_ID_MAP[chain_id]))
    w3.eth.set_gas_price_strategy(medium_gas_price_strategy)
    w3.middleware_onion.add(construct_sign_and_send_raw_middleware(account._acct))
    w3.eth.default_account = account._acct.address
    return w3


def get_project_contract(w3: Web3, address: Address) -> Contract:
    """Load project contract on current chain from build folder."""
    contract = json.load((BUILD_FOLDER / f"contracts/ProjectContract.json").open())
    return w3.eth.contract(address=address, abi=contract["abi"])


def _hex_to_bytes(hex: str) -> bytes:
    return bytes.fromhex(hex if hex[:2] == "0x" else hex)


def export_public_key(private_key_hex: str) -> bytes:
    """Export public key for contract join request.

    Args:
        private_key: hex string representing private key

    Returns:
        32 bytes representing public key
    """
    return bytes(PrivateKey(_hex_to_bytes(private_key_hex)).public_key)


def encrypt_nacl(public_key: bytes, data: bytes) -> bytes:
    """Encryption function using NaCl box compatible with MetaMask
    For implementation used in MetaMask look into: https://github.com/MetaMask/eth-sig-util

    Args:
        public_key: public key of recipient
        data: message data

    Returns:
        encrypted data
    """
    emph_key = PrivateKey.generate()
    enc_box = Box(emph_key, PublicKey(public_key))
    ciphertext = enc_box.encrypt(data)
    return bytes(emph_key.public_key) + ciphertext


def decrypt_nacl(private_key: bytes, data: bytes) -> bytes:
    """Decryption function using NaCl box compatible with MetaMask
    For implementation used in MetaMask look into: https://github.com/MetaMask/eth-sig-util

    Args:
        private_key: private key to decrypt with
        data: encrypted message data

    Returns:
        decrypted data
    """
    emph_key, ciphertext = data[:32], data[32:]
    box = Box(PrivateKey(private_key), PublicKey(emph_key))
    return box.decrypt(ciphertext)


def encrypt_bytes(bytes: bytes, secret: bytes) -> bytes:
    """Encrypt bytes (model) for storing in contract/IPFS."""
    return aes_encrypt(secret, bytes)


def decrypt_bytes(ciphertext: bytes, secret: bytes) -> bytes:
    """Decrypt bytes (model) stored in contract/IPFS."""
    return aes_decrypt(secret, ciphertext)


def get_current_secret(secret: bytes, entry_key_turn: int, key_turn: int) -> bytes:
    """Calculate shared secret at current state."""
    for _ in range(entry_key_turn, key_turn):
        secret = hashlib.sha256(secret).digest()
    return secret
