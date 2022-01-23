import imp
from sqlalchemy import create_engine, engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session
from sqlalchemy.sql.expression import false


# DATABASE_URL = "mysql+mysqlconnector://NTR212:petclinic@localhost:3306/TRFastApi"
DATABASE_URL = "mysql+mysqlconnector://NTR212:petclinic@mysql/TRFastApi"


engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()