from sqlalchemy.orm import Session
import string
import random
# from app import crud, schemas

# from app.crud import crud_user
from app.models.user import User
from app.models.project import Project
from app.models.raport import Raport
from app.models.entry import Entry

from datetime import date


def random_lower_string() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=10))

def init_db(db: Session) -> None:
    initial_users = [
        {
            "name": "Bilbo",
            "surname": "Baggins",
            "userName": "Bilbo12"
        },
        {
            "name": "Saruman",
            "surname": "Curumo",
            "userName": "LoveSauron"
        },
        {
            "name": "Gimli",
            "surname": "Dwarf",
            "userName": "Dwarf120"
        },
        {
            "name": "John",
            "surname": "Kowalski",
            "userName": "kowal222"
        },
        {
            "name": "Alina",
            "surname": "Balbinka",
            "userName": "balbinka111"
        },
    ]
    user_ids = []
    for user in initial_users:
        db_user =  db.query(User).filter(User.userName == user["userName"]).first()
        if not db_user:
            db_user = User(
                name=user["name"],
                surname=user["surname"],
                userName=user["userName"]
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

            raports = []
            # Raports
            year = 2020
            month = 1
            for i in range(3):
                db_raport = Raport(
                        year=year+i,
                        month=month,
                        owner_id=db_user.id
                    ) 
                db.add(db_raport)
                db.commit()
                db.refresh(db_raport)
                raports.append(db_raport)

            # Projects
            for i in range(3):
                db_project = Project(code=random_lower_string(), name=random_lower_string(), budget=124*60 ,description=random_lower_string(), owner_id=db_user.id)
                db.add(db_project)
                db.commit()
                db.refresh(db_project)

                # Entries               
                for j in range(5):
                    random_raport = random.choice(raports)
                    random_date = date(random_raport.year, random_raport.month, random.randint(1,20))
                    db_entry = Entry(
                        timeSubmitted=random.randint(1,60), 
                        date=random_date, 
                        raport_id=random_raport.id, 
                        project_id=db_project.id,  
                        description=random_lower_string()
                    )
                    db.add(db_entry)
                    db.commit()
                    db.refresh(db_entry)

    return


