import asyncio
import streamlit as st
import requests
import os
import websockets

# connect_button = wallet_connect(label="wallet", key="1234567890123")

def home():
    api_url = "http://127.0.0.1:8000"

    st.title("Entrenador de IA")

    dockerfile = st.file_uploader("Selecciona un Dockerfile")
    python_code = st.file_uploader("Selecciona un archivo Python o Jupyter Notebook", type=["py", "ipynb"])

    # Función para recibir y mostrar los logs en tiempo real
    async def stream_logs(container_id):
        st.subheader("Logs:")
        # Hacer una solicitud a FastAPI para iniciar la transmisión de logs
        ws_url = f"ws://localhost:8000/stream-logs/{container_id}"

        async with websockets.connect(ws_url) as websocket:
            while True:
                message = await websocket.recv()
                st.text(f"{message}")

    if st.button("Entrenar modelo"):
        if dockerfile is not None and python_code is not None:
            # Guardar archivos temporales
            with open("Dockerfile", "wb") as df:
                df.write(dockerfile.read())
            with open("code.py", "wb") as code:
                code.write(python_code.read())

            try:
                # Realizar una solicitud a la API para construir la imagen
                response = requests.post(f"{api_url}/build-and-run", files={"dockerfile": open("Dockerfile", "rb"), "code": open("code.py", "rb")})
                response.raise_for_status()  # Lanzar una excepción en caso de error HTTP
                
                result = response.json()

                # Mostrar un enlace para descargar el modelo
                if "download_url" in result:
                    st.success("Contenedor ejecutado exitosamente. Descarga el modelo:")
                    st.markdown(f"[Descargar Modelo]({result['download_url']})")
                
                container_id = result["container_id"]

                # Lanzar la función de stream_logs en un bucle de eventos de fondo
                asyncio.run(stream_logs(container_id))

            except requests.exceptions.RequestException as req_err:
                st.text("Error al realizar la solicitud a la API: " + str(req_err))
            except Exception as e:
                st.text("Hubo un error :( " + str(e))
            finally:
                # Eliminar archivos temporales
                os.remove("Dockerfile")
                os.remove("code.py")
            
        else:
            st.warning("Por favor, selecciona ambos archivos.")

            st.write("# Welcome to Streamlit! 👋")

        st.markdown(
            """
            Streamlit is an open-source app framework built specifically for
            Machine Learning and Data Science projects.

            **👈 Select a demo from the dropdown on the left** to see some examples
            of what Streamlit can do!

            ### Want to learn more?

            - Check out [streamlit.io](https://streamlit.io)
            - Jump into our [documentation](https://docs.streamlit.io)
            - Ask a question in our [community
                forums](https://discuss.streamlit.io)

            ### See more complex demos

            - Use a neural net to [analyze the Udacity Self-driving Car Image
                Dataset](https://github.com/streamlit/demo-self-driving)
            - Explore a [New York City rideshare dataset](https://github.com/streamlit/demo-uber-nyc-pickups)
        """
        )
