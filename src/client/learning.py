import numpy as np
import numpy_serializer as ns
from starlette.responses import Response
from starlette.routing import Router

router = Router()

arr = np.array([1, 2, 3], dtype=np.float32)


@router.route("/get_params")
def get_parms(request):
    data = ns.to_bytes(arr)
    return Response(data, media_type="application/octet-stream")


# r = await httpx.get("http://0.0.0.0/8000/learning/get_params")
# ns.from_bytes(r.content)