FROM python:3.9
 
WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./ /code/app

WORKDIR /code/app

# Comando para hacer ping a una dirección IP específica
RUN ping -c 4 10.30.14.252

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]