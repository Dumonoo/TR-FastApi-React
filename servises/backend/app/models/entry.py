
from sqlalchemy.schema import Column
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean, Date
from sqlalchemy.types import String, Integer, Text, DateTime, TIMESTAMP
from sqlalchemy import text


from sqlalchemy.orm import relationship

from ..database import Base

class Entry(Base):
    __tablename__ = "entries"
    id = Column(Integer, primary_key=True, index=True)
    timeSubmitted = Column(Integer)
    # timeAccepted = Column(Integer, default=NULL)
    date = Column(Date)
    description = Column(String(200))

    raport_id = Column(Integer, ForeignKey("raports.id"))
    raport = relationship("Raport", back_populates="entries")

    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="entries")

    subactivity_id = Column(Integer, ForeignKey("subactivities.id"))
    subactivity = relationship("Subactivity", back_populates="entries")

    version = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))