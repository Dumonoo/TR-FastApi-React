from fastapi import APIRouter
from fastapi import Depends, FastAPI, HTTPException

from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user

from typing import List

from app import schemas
from app.crud import crud_raport

from ...database import SessionLocal, engine
from app.api import deps

from app.models import raport



raport.Base.metadata.create_all(bind=engine)

router = APIRouter()



@router.get("/getRaports/{user_id}/", response_model=List[schemas.raport.Raport])
async def get_raports(user_id: int, db: Session = Depends(deps.get_db)):
    return crud_raport.get_user_raports(db=db, user_id=user_id)

@router.post("/submitRaport/{id}/", response_model=bool)
async def submit_raport(id: int, db: Session = Depends(deps.get_db)):
    db_raport = crud_raport.get_raport_by_id(db=db, id=id)
    if db_raport.isSubmitted:
        raise HTTPException(status_code=409, detail="Raport have already been submitted")
    
    return crud_raport.submit_raport(db=db, id=id)
