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
# app.mount("/static", StaticFiles(directory="build"), name="build")
# app.mount("/build", StaticFiles(directory="build"), name="build")
# app.mount("/page", StaticFiles(directory="build",html = True), name="build")

app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="build",html = True), name="build")


@app.get("/", tags=["root"])
async def read_root(db: Session = Depends(deps.get_db)) -> dict:
    # init_db(db)
    # return FileResponse('build/index.html')

    return {"message": "Return page"}

@app.post("/loginCookie/")
async def create_cookie(response: Response):
    response.set_cookie(key="userName", value="proper-username", max_age=6000)
    response.set_cookie(key="userId", value="proper-user-id", max_age=6000)
    return {"message": "You log in succesfully"}

@app.get("/logout/")
async def delete_cookie(response: Response):
    response.delete_cookie("userName")
    response.delete_cookie("userId")
    return {"message": "You log out succesfully"}

@app.get('/me/')
async def whoami(userName: Optional[str] = Cookie(None), userId: Optional[str] = Cookie(None)):
    if userName:
        answer = userName
        logged = True
    else:
        answer = None
        logged = False
    return {"Logged": logged, "User": userName, "UserId": 1}



