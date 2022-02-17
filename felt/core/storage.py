"""Module for storing and managing data files at IPFS/Filecoin using web3.storage."""
import os
import time

import httpx

from felt.core.web3 import decrypt_bytes


def ipfs_upload_file(file):
    """Upload file to IPFS using web3.storage.

    Args:
        file: file-like object in byte mode.

    Returns:
        Response: httpx response object
    """
    # TODO: Check for upload error
    return httpx.post(
        f"https://api.web3.storage/upload",
        headers={"Authorization": "Bearer " + os.environ["WEB3_STORAGE_TOKEN"]},
        files={"file": file},
        timeout=None,
    )


def ipfs_download_file(cid, output_path=None, secret=None):
    """Download file stored in IPFS.

    Args:
        cid (str): string describing location of the file.
        output_path (Optiona[str]): if set file will be stored at this path.

    Returns:
        Response: httpx response object
    """
    for _ in range(5):
        try:
            res = httpx.get(f"https://{cid}.ipfs.dweb.link/", timeout=10.0)
        except httpx.ReadTimeout:
            print("Connection timeout - retry")
            time.sleep(5)

    content = res.content
    if secret is not None:
        content = decrypt_bytes(res.content, secret)

    if output_path is not None:
        with open(output_path, "wb") as f:
            f.write(content)

    return content
