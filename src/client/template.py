from pathlib import Path

from starlette.templating import Jinja2Templates

main_folder = Path(__file__).parent
templates = Jinja2Templates(directory=main_folder / "templates")

TemplateResponse = templates.TemplateResponse
