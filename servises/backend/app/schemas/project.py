from ensurepip import version
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

from .user import User

from .subactivity import Subactivity

class ProjectBase(BaseModel):
    code: str
    name: str
    budget: int
    description: Optional[str] 

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    version: datetime

class Project(ProjectBase):
    id: int
    owner_id: int
    owner: User
    isActive: bool
    subactivities: List[Subactivity] = []
    version: datetime

    class Config:
        orm_mode  = True
