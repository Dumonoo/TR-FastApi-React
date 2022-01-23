from typing import List, Optional

from fastapi import APIRouter, dependencies
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import false, null, true
from starlette.responses import Response
from app import schemas
from fastapi import Depends, FastAPI, HTTPException, Cookie

from app.models import user
from app.crud import crud_user
from app.api import deps

from ...database import SessionLocal, engine

user.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post("/login/{id}")
async def login(response: Response, id: int, db: Session = Depends(deps.get_db)):
    user = crud_user.get_user_by_id(db=db, id=id)
    max_age=6000
    if not user:
        raise HTTPException(status_code=404, detail="User with this id do not exists!")
    else:
        response.set_cookie(key="userName", value=user.userName, max_age=max_age)
        response.set_cookie(key="userId", value=user.id, max_age=max_age)
    return user

@router.get("/logout/")
async def logout(response: Response):
    response.delete_cookie("userName")
    response.delete_cookie("userId")
    return {"message": "You logout succesfully"}

@router.get('/me/')
async def whoami(userName: Optional[str] = Cookie(None), userId: Optional[str] = Cookie(None)):
    if userName and userId:
        return {"Logged": True, "User": userName, "UserId": userId}
    else:
        return {"Logged": False, "User": None, "UserId": None}


@router.get("/", response_model=List[schemas.user.User])
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    from app.init_db import init_db
    init_db(db)
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users

@router.post("/newUser/", response_model=schemas.user.User)
async def create_user(user: schemas.user.UserCreate, db: Session = Depends(deps.get_db)):
    db_user = crud_user.get_user_by_userName(db, userName=user.userName)
    if db_user:
        raise HTTPException(status_code=400, detail="User with this username already exists.")
    return crud_user.create_user(db=db, user=user)



    
