from sqlalchemy.orm import Session, relationship

from app.models.entry import Entry
from app.models.raport import Raport
from app.schemas.entry import EntryCreate, EntryUpdate

def create_entry(db: Session, entry: EntryCreate, raport: Raport):  
    db_entry = Entry(timeSubmitted=entry.timeSubmitted, date=entry.date, raport_id=raport.id, project_id=entry.project_id, subactivity_id=entry.subactivity_id, description=entry.description)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def update_entry(db: Session, entry: EntryUpdate, raport: Raport):
    db_entry = get_by_id(db, entry_id=entry.id)
    
    for key, value in entry:
        if value is not None and key not in [
                "id",
                "version",
            ]:
                setattr(db_entry, key, value)
                db.commit()

    db_entry.raport_id = raport.id
    db.commit()
    db.refresh(db_entry)
    return db_entry

def delete_entry(db: Session, entry_id: int):
    db_entry = db.query(Entry).filter(Entry.id == entry_id).first()
    db.delete(db_entry)
    db.commit()

    return True

def get_by_id(db: Session, entry_id: int):
    return db.query(Entry).filter(Entry.id == entry_id).first()