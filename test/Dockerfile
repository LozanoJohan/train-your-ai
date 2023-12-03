# Dockerfile
#FROM python:3.8-slim
FROM tensorflow/tensorflow:latest

# # Establecer el directorio de trabajo
# WORKDIR /

# # Copiar el código de entrenamiento
# COPY train.py .

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el código y el Dockerfile al directorio de trabajo
COPY . /app

# Instala las dependencias
RUN pip install -r requirements.txt

# Expone el puerto que usará tu aplicación (ajústalo según sea necesario)
EXPOSE 8000

# Comando para ejecutar tu aplicación
CMD ["python", "main.py"]