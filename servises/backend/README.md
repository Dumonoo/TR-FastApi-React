# NTR project - lab 4

## Building steps 

```bash
    python3.9 -m venv myVenv
    source myVenv/bin/activate
    pip install fastapi==0.61.1 uvicorn==0.11.8

    pip install jinja2 python-multipart


    pip install sqlalchemy mysql-connector-python


```

```mysql

create database TRFastApi;
select host, user from mysql.user;
Create user 'NTR212'@'%' identified by 'petclinic';

GRANT ALL PRIVILEGES ON *.* TO  'NTR212'@'%';


```




