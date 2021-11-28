"""Module supporting work of the builder."""
import asyncio
from pathlib import Path

import joblib

from felt.core.storage import ipfs_download_file, ipfs_upload_file


def upload_model(model):
    """Function for uploading scikit-learn model to ipfs."""
    tmp_path = Path("tmp_model.joblib")
    joblib.dump(model, tmp_path)
    with open(tmp_path, "rb") as f:
        res = asyncio.run(ipfs_upload_file(f))
    tmp_path.unlink()
    return res.json()["cid"]
