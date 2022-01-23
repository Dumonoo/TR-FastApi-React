from typing import Optional, List
from pydantic import BaseModel

class AcceptedBase(BaseModel):
    time: int

class AcceptedCreate(AcceptedBase):
    pass

class Accepted(AcceptedBase):
    id: int
    raport_id: int
    project_id: int

    class Config:
        orm_mode  = True