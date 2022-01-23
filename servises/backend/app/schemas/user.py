# from typing import

from typing import List
from pydantic import BaseModel
from pydantic.fields import T
# from .project import Project
# from .raport import Raport

class UserBase(BaseModel):
    userName: str

class UserCreate(UserBase):
    name: str
    surname: str

class User(UserCreate):
    id: int
    # raports: List[Raport] = []
    # projects: List[Project] = []
    
    class Config:
        orm_mode  = True
