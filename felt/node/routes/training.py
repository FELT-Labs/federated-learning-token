import shutil

import numpy as np
import numpy_serializer as ns
from aiofiles.os import wrap
from starlette.responses import Response
from starlette.routing import Router

# Async wrapper for copying file object
# TODO: Test if works on python3.6, 3.7, 3.8???
copyfileobj = wrap(shutil.copyfileobj)


router = Router()

# Dummy array
arr = np.array([1, 2, 3], dtype=np.float32)


@router.route("/get_params")
def get_parms(request):
    data = ns.to_bytes(arr)
    return Response(data, media_type="application/octet-stream")


@router.route("/upload_model", methods=["POST"])
async def receive_model(request):
    try:
        form = await request.form()

        model_file = f"{form['client_id']}-{form['hash']}.joblib"
        model_file = request.app.state.LOGS_FOLDER / model_file
        with model_file.open("wb+") as f:
            await copyfileobj(form["model_file"].file, f)

        print("Model saved to:", model_file)

    except:
        return Response("Failed.", media_type="plaintext")
    return Response("Received.", media_type="plaintext")


# r = await httpx.get("http://0.0.0.0/8000/learning/get_params")
# ns.from_bytes(r.content)
