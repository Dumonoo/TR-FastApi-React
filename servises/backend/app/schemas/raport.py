from typing import Optional, List
from pydantic import BaseModel

from .accepted import Accepted
from .entry import Entry


class RaportBase(BaseModel):
    year: int
    month: int


class RaportCreate(RaportBase):
    pass

class Raport(RaportBase):
    id: int
    owner_id: int
    isSubmitted: bool

    accepted: List[Accepted] = []
    entries: List[Entry] = []

    class Config:
        orm_mode = True