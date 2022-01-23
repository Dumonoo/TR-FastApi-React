from sqlalchemy.orm import Session, relationship

from app import schemas

from app.models.subactivity import Subactivity
from app.schemas.subactivity import SubactivityCreate

def get_subactivities_for_project_id(db: Session, project_id: int):
    pass

def create_subactivity(db: Session, subactivity: SubactivityCreate, project_id: int):
    db_subactivity = Subactivity(code=subactivity.code, project_id=project_id)
    db.add(db_subactivity)
    db.commit()
    db.refresh(db_subactivity)
    return db_subactivity
