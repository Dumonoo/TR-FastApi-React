from typing import Optional, List
from pydantic import BaseModel


class SubactivityBase(BaseModel):
    code: str

class SubactivityCreate(SubactivityBase):
    pass

class Subactivity(SubactivityBase):
    id: int
    project_id: int

    class Config:
        orm_mode  = True