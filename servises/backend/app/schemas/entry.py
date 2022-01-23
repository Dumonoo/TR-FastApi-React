from typing import Optional, List
from pydantic import BaseModel
from datetime import date
from datetime import datetime

from app import schemas

class EntryBase(BaseModel):
    date: date
    timeSubmitted: int
    description: Optional[str]
    project_id: int
    subactivity_id: Optional[int]

class EntryCreate(EntryBase):
    pass

class EntryUpdate(EntryCreate):
    id: int
    version: datetime


class Entry(EntryBase):
    id: int
    raport_id: int
    project: Optional[schemas.project.Project]
    version: datetime

    class Config:
        orm_mode = True
    

    