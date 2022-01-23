from typing import List

from fastapi import APIRouter, dependencies
from fastapi import Depends, FastAPI, HTTPException

from sqlalchemy.orm import Session
from app import schemas

from ...database import SessionLocal, engine

from app.api import deps

from app.models import subactivity
from app.crud import crud_subactivity

subactivity.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post("/newSub/{project_id}", response_model=schemas.subactivity.Subactivity)
async def create_subactivity(project_id: int, subactivity: schemas.subactivity.SubactivityCreate, db: Session = Depends(deps.get_db)):
    return crud_subactivity.create_subactivity(db=db, subactivity=subactivity, project_id=project_id)
