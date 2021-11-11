from pathlib import Path

import uvicorn
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles

from learning import router as learn_router
from main import router as main_router

main_folder = Path(__file__).parent

# Routes
routes = [
    Mount("/static", StaticFiles(directory=main_folder / "static"), name="static"),
    Mount("/learning", routes=learn_router.routes),
    Mount("/", routes=main_router.routes),
]

middleware = [
    # Middleware(HTTPSRedirectMiddleware)
]

app = Starlette(debug=True, routes=routes, middleware=middleware)


@app.exception_handler(403)
async def not_found(request, exc):
    """
    Return an HTTP 403 page.
    """
    template = "403.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context, status_code=403)


@app.exception_handler(499)
async def server_error(request, exc):
    """
    Return an HTTP 499 page.
    """
    template = "499.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context, status_code=499)


def on_start():
    # TOOD: Define some executor for training
    pass


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, loop="asyncio")
