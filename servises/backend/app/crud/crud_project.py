from sqlalchemy.orm import Session, relationship
from app import schemas

from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate

def get_projects(db: Session):
    return db.query(Project).all()

def get_project_by_code(db: Session, code: str):
    return db.query(Project).filter(Project.code == code).first()

def get_projects_by_owner_id(db: Session, owner_id: int):
    return db.query(Project).filter(Project.owner_id == owner_id).all()

def get_project_by_id(db: Session, id: int):
    return db.query(Project).filter(Project.id == id).first()

def create_project(db: Session, project: ProjectCreate, user_id: int):
    db_project = Project(code=project.code, name=project.name, budget=project.budget ,description=project.description, owner_id=user_id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project: ProjectUpdate, id: int):
    db_project = db.query(Project).filter(Project.id == id).first()
    for key, value in project:
        if value is not None:
            setattr(db_project, key, value)
    db.commit()
    db.refresh(db_project)
    return db_project

def close_project(db: Session, id: int):
    project = db.query(Project).filter(Project.id == id).first()
    project.isActive = False
    db.commit()
    db.refresh(project)
    return project.isActive

