from sqlalchemy.orm import Session, relationship

from app.models.raport import Raport 
from app.schemas.raport import RaportCreate

def get_raports_by_user(db: Session, user_id: int):
    return db.query(Raport).filter(Raport.owner_id==user_id).all()

def get_raport_by_year_month(db: Session, year: int, month: int):
    return db.query(Raport).filter(Raport.year==year, Raport.month==month).first()

def get_raport_by_id(db: Session, id: int):
    return db.query(Raport).filter(Raport.id == id).first()

def submit_raport(db: Session, id: int):
    db_raport = db.query(Raport).filter(Raport.id == id).first()
    db_raport.isSubmitted = True
    db.commit()
    db.refresh(db_raport)
    return db_raport.isSubmitted

def get_user_raports(db: Session, user_id: int):
    db_raports = db.query(Raport).filter(Raport.owner_id == user_id).all()
    if not db_raports:
        return []
    return db_raports

def get_or_create(db: Session, user_id: int, year: int, month: int):
    db_raport = db.query(Raport).filter(Raport.owner_id==user_id, Raport.year==year, Raport.month==month).first()
    if not db_raport:
        db_raport = Raport(
            year=year,
            month=month,
            owner_id=user_id
        )
        db.add(db_raport)
        db.commit()
        db.refresh(db_raport)
    return db_raport

def create_raport(db: Session, raport: RaportCreate, user_id: int):
    db_raport = Raport(year=raport.year, month=raport.month, owner_id=user_id)
    db.add(db_raport)
    db.commit()
    db.refresh(db_raport)
    return db_raport