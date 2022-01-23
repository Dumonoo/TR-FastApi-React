from typing import List

from fastapi import APIRouter
from fastapi import Depends, FastAPI, HTTPException

from sqlalchemy.orm import Session

from app import schemas
from app.api import deps
from app.crud import crud_project

from app.models import project



from ...database import SessionLocal, engine

project.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.get("/", response_model=List[schemas.project.Project])
async def read_projects(db: Session = Depends(deps.get_db)):
    projects = crud_project.get_projects(db=db)
    return projects

@router.get("/{user_id}/", response_model=List[schemas.project.Project])
async def read_user_projects(user_id: int, db: Session = Depends(deps.get_db)):
    projects = crud_project.get_projects_by_owner_id(db=db, owner_id=user_id)
    return projects

@router.get("/project/{project_id}", response_model=schemas.project.Project)
async def read_project(project_id: int, db: Session = Depends(deps.get_db)):
    project = crud_project.get_project_by_id(db=db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return project

@router.post("/newProject/{user_id}/", response_model=schemas.project.Project)
async def create_project(user_id: int, project: schemas.project.ProjectCreate, db: Session = Depends(deps.get_db)):
    db_project = crud_project.get_project_by_code(db=db, code=project.code)
    if db_project:
        raise HTTPException(status_code=400, detail="Project with this code exists.")

    return crud_project.create_project(db=db, project=project, user_id=user_id)

@router.post("/closeProject/{project_id}", response_model = bool)
async def closeProject(project_id: int, db: Session = Depends(deps.get_db)):
    project = crud_project.get_project_by_id(db=db, id=project_id)
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    else:
        return crud_project.close_project(db=db, id=project_id)

@router.put("/editProject/{project_id}/", response_model=schemas.project.Project)
async def update_project(project_id: int, project: schemas.project.ProjectUpdate, db: Session = Depends(deps.get_db)):
    db_project = crud_project.get_project_by_id(db=db, id=project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found.")
    
    if db_project.isActive == False:
        raise HTTPException(status_code=409, detail="Project is inactive.")

    # concurency check
    if db_project.version != project.version:
        raise HTTPException(status_code=409, detail="Concurrency Error")

    return crud_project.update_project(db=db, project=project, id=project_id)