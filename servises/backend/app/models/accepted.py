from sqlalchemy.schema import Column
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.types import String, Integer, Text

from sqlalchemy.orm import relationship


from ..database import Base

class Accepted(Base):
    __tablename__ = "acceptedTimes"
    id = Column(Integer, primary_key=True, index=True)
    time = Column(Integer)

    raport_id = Column(Integer, ForeignKey("raports.id"))
    raport = relationship("Raport", back_populates="accepted")

    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="accepted")