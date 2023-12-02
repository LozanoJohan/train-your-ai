# 
FROM python:3.9
 
# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# CE
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./server /code/app

# 
CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "80"]