from starlette.routing import Router

from template import TemplateResponse

router = Router()


@router.route("/")
async def homepage(request):
    template = "index.html"
    context = {"request": request}
    return TemplateResponse(template, context)


@router.route("/error")
async def error(request):
    """
    An example error. Switch the `debug` setting to see either tracebacks or 500 pages.
    """
    raise RuntimeError("Oh no")
