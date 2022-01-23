from fastapi import APIRouter
from fastapi import Depends, FastAPI, HTTPException

from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user

from ...database import SessionLocal, engine
from app.api import deps

from app import schemas
from app.crud import crud_entry, crud_raport
from app.models import entry

entry.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post("/newEntry/{user_id}", response_model=schemas.entry.Entry)
async def create_entry(entry: schemas.entry.EntryCreate, user_id: int, db: Session = Depends(deps.get_db)):
    year = entry.date.year
    month = entry.date.month
    raport = crud_raport.get_or_create(db=db, user_id=user_id, year=year, month=month)
    if raport.isSubmitted:
        # TODO: test this
        raise HTTPException(status_code=409, detail=f"This raport has already been  submited: {month}-{year}")


    return crud_entry.create_entry(db=db, entry=entry, raport=raport)

@router.post("/updateEntry/{user_id}", response_model=schemas.entry.Entry)
async def update_entry(entry: schemas.entry.EntryUpdate, user_id: int, db: Session = Depends(deps.get_db)):
    year = entry.date.year
    month = entry.date.month
    raport = crud_raport.get_or_create(db=db, user_id=user_id, year=year, month=month)
    if raport.isSubmitted:
        # TODO: test this
        raise HTTPException(status_code=409, detail=f"This raport has already been  submited: {month}-{year}")
    db_entry = crud_entry.get_by_id(db=db, entry_id=entry.id)

    if db_entry.version != entry.version:
        raise HTTPException(status_code=409, detail="Concurrency Error")
    
    return crud_entry.update_entry(db=db, entry=entry, raport=raport)

@router.delete("/deleteEntry/{entry_id}", response_model=bool)
async def delete_entry(entry_id: int, db: Session = Depends(deps.get_db)):
   return crud_entry.delete_entry(db=db, entry_id=entry_id)


@router.get("/getEntry/{entry_id}", response_model=schemas.entry.Entry)
async def get_entry(entry_id: int, db: Session = Depends(deps.get_db)):
    db_entry = crud_entry.get_by_id(db=db, entry_id=entry_id)
    if not db_entry:
        raise HTTPException(status_code=404, detail="Not found")

    return db_entry