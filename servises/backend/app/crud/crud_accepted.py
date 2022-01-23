from sqlalchemy.orm import Session, relationship

from app.models.accepted import Accepted
from app.schemas.accepted import AcceptedCreate

def create_accepted(db: Session, accepted: AcceptedCreate, project_id: int, raport_id: int):
    db_accepted = Accepted(time=accepted.time, project_id=project_id, raport_id=raport_id)
    db.add(db_accepted)
    db.commit()
    db.refresh(db_accepted)
    return db_accepted