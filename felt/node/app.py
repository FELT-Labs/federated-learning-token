"""Main app module for starting the ASGI server."""
from pathlib import Path

import uvicorn
from dotenv import load_dotenv
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles

from felt.node.routes.main import router as main_router
from felt.node.utils.template import TemplateResponse

# Load dotenv at the beginning of the program
load_dotenv()


main_folder = Path(__file__).parent
logs_folder = main_folder / "logs"

# Routes
routes = [
    Mount("/static", StaticFiles(directory=main_folder / "static"), name="static"),
    Mount("/", routes=main_router.routes),
]

middleware = [
    # Middleware(HTTPSRedirectMiddleware)
]


def startup():
    logs_folder.mkdir(parents=True, exist_ok=True)


app = Starlette(debug=True, routes=routes, middleware=middleware, on_startup=[startup])
app.state.LOGS_FOLDER = logs_folder


@app.exception_handler(403)
async def not_found(request, exc):
    """
    Return an HTTP 403 page.
    """
    template = "403.html"
    context = {"request": request}
    return TemplateResponse(template, context, status_code=403)


@app.exception_handler(499)
async def server_error(request, exc):
    """
    Return an HTTP 499 page.
    """
    template = "499.html"
    context = {"request": request}
    return TemplateResponse(template, context, status_code=499)


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000, loop="asyncio")


if __name__ == "__main__":
    main()
