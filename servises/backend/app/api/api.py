import imp
from typing import List, Optional
from typing_extensions import final
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi import Depends, FastAPI, HTTPException, Request ,Cookie, Response
from fastapi.responses import HTMLResponse
from app import api
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse 
from app.api import api_router

from app.init_db import init_db

from sqlalchemy.orm import Session

from app.api import deps
import pkg_resources
from fastapi.templating import Jinja2Templates


origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:5000",
    "localhost:5000"
]
app = FastAPI(title="App")
api_app = FastAPI(title="Api")
api_app.include_router(api_router.api_router, prefix='/api')


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="build",html = True), name="build")


@app.get("/", tags=["root"])
async def read_root(db: Session = Depends(deps.get_db)) -> dict:
    return {"message": "Return page"}



