from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text, LargeBinary

from sqlalchemy.orm import relationship

from ..database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(25))
    surname = Column(String(25))
    userName = Column(String(25), unique=True)

    raports = relationship("Raport", back_populates="owner")
    
    projects = relationship("Project", back_populates="owner")
