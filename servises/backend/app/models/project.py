from sqlalchemy.schema import Column
from sqlalchemy.sql.expression import _BindParamClause
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.types import String, Integer, Text, TIMESTAMP
from sqlalchemy.schema import FetchedValue
from sqlalchemy import text

from sqlalchemy.orm import relationship

from ..database import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(25))
    name = Column(String(25))
    description = Column(String(200))
    budget = Column(Integer)
    isActive = Column(Boolean, default=True)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="projects")
    
    subactivities = relationship("Subactivity", back_populates="project")
    entries = relationship("Entry", back_populates="project")

    accepted = relationship("Accepted", back_populates="project")

    version = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))