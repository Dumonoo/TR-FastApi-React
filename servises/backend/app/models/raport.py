from sqlalchemy.schema import Column
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.types import String, Integer, Text

from sqlalchemy.orm import relationship

from ..database import Base

class Raport(Base):
    __tablename__ = "raports"
    id = Column(Integer, primary_key=True, index=True)
    year =  Column(Integer)
    month = Column(Integer)
    isSubmitted = Column(Boolean, default=False)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="raports")
    
    entries = relationship("Entry", back_populates="raport")
    
    accepted = relationship("Accepted", back_populates="raport")
