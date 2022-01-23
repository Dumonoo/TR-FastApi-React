from fastapi import APIRouter
from fastapi import Depends, FastAPI, HTTPException


from sqlalchemy.orm import Session
from app.api import deps

from app import schemas
from app.crud import crud_accepted
from app.models import accepted

from ...database import SessionLocal, engine

accepted.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post("/{project_id}/{raport_id}/acceptTime", response_model=schemas.accepted.Accepted)
async def accept_time(project_id: int, raport_id: int, accepted: schemas.accepted.AcceptedCreate, db: Session = Depends(deps.get_db)):
    return crud_accepted.create_accepted(db=db, accepted=accepted, project_id=project_id, raport_id=raport_id)
