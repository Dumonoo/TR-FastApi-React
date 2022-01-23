from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate

# class Crud_User():
    
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_userName(db: Session, userName: str):
    return db.query(User).filter(User.userName == userName).first()

def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()
    
def get_users(db: Session, skip: int = 0,  limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    db_user = User(name=user.name, surname=user.surname, userName=user.userName)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
