
from fastapi import APIRouter

from app.api.endpoints import users, projects, subactivities, raports, acceptedTimes, entries

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["project"])
api_router.include_router(subactivities.router, prefix="/subAct", tags=["subAct"])
api_router.include_router(raports.router, prefix="/raports", tags=["raports"])
api_router.include_router(acceptedTimes.router, prefix="/accept", tags=["accept"])
api_router.include_router(entries.router, prefix="/entry", tags=["entry"])