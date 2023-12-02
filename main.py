from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse, StreamingResponse
import os
import docker
from fastapi import FastAPI, WebSocket
from docker import DockerClient
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
client = docker.DockerClient(base_url='tcp://10.30.14.252:2375') 

# Configuración CORS para permitir solicitudes desde cualquier dominio
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_url = "http://127.0.0.1:8000"

@app.post("/build-and-run")
async def build_and_run_image(
    dockerfile: UploadFile = File(...), code: UploadFile = File(...)
):
    # Leer el contenido del Dockerfile y del código Python
    dockerfile_content = await dockerfile.read()
    code_content = await code.read()

    # Crear un cliente de Docker
    client = DockerClient.from_env()

    # Guardar el Dockerfile y el código en archivos temporales
    with open("/tmp/Dockerfile", "wb") as df:
        df.write(dockerfile_content)
    with open("/tmp/main.py", "wb") as code_file:
        code_file.write(code_content)

    # Construir la imagen desde el contenido del Dockerfile
    response = client.images.build(path="/tmp", rm=False, dockerfile="/tmp/Dockerfile")

    # Obtener el ID de la imagen recién construida
    image_id = response[0].id

    # Crear y ejecutar un contenedor basado en la imagen construida
    container = client.containers.run(image_id, detach=True, remove=False)

    # Esperar a que el contenedor termine su ejecución
    exit_code = container.wait()["StatusCode"]

    if exit_code == 0:
        # Obtener la URL de descarga para el modelo directamente desde el contenedor
        download_url = f"{api_url}/download-model/{container.id}"

        # Eliminar archivos temporales
        os.remove("/tmp/Dockerfile")
        os.remove("/tmp/main.py")

        return {"message": "Contenedor ejecutado exitosamente", "container_id": container.id, "download_url": download_url}
    else:
        # Si el contenedor falla, lanzar una excepción HTTP
        raise HTTPException(status_code=500, detail="El contenedor no se ejecutó correctamente.")


@app.get("/download-model/{container_id}")
async def download_model(container_id: str):
    try:
        container = client.containers.get(container_id)
        # Ruta del archivo de salida en el contenedor
        container_output_path = "/app/output.h5"

        # Crear un archivo temporal local para almacenar el contenido del archivo del contenedor
        local_output_path = os.path.join(os.getcwd(), "tmp", "output.h5")
        os.makedirs(os.path.join(os.getcwd(), "tmp"), exist_ok=True)

        # Copiar el archivo del contenedor al sistema de archivos local
        with open(local_output_path, "wb") as local_output_file:
            data, _ = container.get_archive(container_output_path)
            for chunk in data:
                local_output_file.write(chunk)

        # Verificar si el archivo local existe
        if os.path.exists(local_output_path):
            # Devolver el archivo como respuesta de transmisión
            return StreamingResponse(
                open(local_output_path, "rb"),
                media_type="application/octet-stream",
                headers={
                    "Content-Disposition": "attachment; filename=output.h5"
                },
            )
        else:
            raise HTTPException(
                status_code=404, detail="El modelo no está disponible para descargar."
            )

    except docker.errors.NotFound as e:
        raise HTTPException(status_code=404, detail=f"Contenedor no encontrado. {e}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al descargar el modelo: {e}"
        )


# Lista para almacenar conexiones WebSocket
connections = []

@app.websocket("/stream-logs/{container_id}")
async def stream_logs_websocket(websocket: WebSocket, container_id: str):
    await websocket.accept()
    connections.append(websocket)
    
    try:
        # Obtener el contenedor según container_id (debes implementar esta lógica)
        container = client.containers.get(container_id)

        # Iterar sobre los logs y enviarlos a los clientes WebSocket
        for log in container.logs(stream=True, follow=True):
            print(log.decode("utf-8"))
            await websocket.send_text(log.decode("utf-8"))
    except Exception as e:
        print(f"Error al transmitir logs: {e}")
    finally:
        connections.remove(websocket)
