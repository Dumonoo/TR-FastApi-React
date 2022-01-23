FROM node:lts-alpine as builder
COPY ./frontend /src
WORKDIR src
RUN npm install
RUN npm run build


FROM python:3.9.9 as server
COPY ./backend /serv
COPY ./backend/requirements.txt /serv/requirements.txt
COPY --from=builder /src/build /serv/build
WORKDIR serv
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["uvicorn", "app.api.api:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]

