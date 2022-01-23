from sqlalchemy.schema import Column
from sqlalchemy.sql.expression import _BindParamClause
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.types import String, Integer, Text

from sqlalchemy.orm import relationship

from ..database import Base

class Subactivity(Base):
    __tablename__ = "subactivities"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(25))

    # Foreign Keys
    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="subactivities")

    entries = relationship("Entry", back_populates="subactivity")