from PIL import Image
import streamlit as st

def my_models():
    st.title("Mis modelos")
    st.divider()

    st.header("Modelo 1")
    st.subheader("Demostración")

    # Load the image (assuming 'image.jpg' is in the same directory)
    image = Image.open('image.jpg')

    # Display the image using st.image
    st.image(image, caption='Carros', use_column_width=True)

    col1, col2 = st.columns(2)
    with col1:
        st.button("Descargar modelo", key="11")
    with col2:
        st.button("No me sirvió", key="12")

    st.divider()

    st.header("Modelo 1")
    st.text("")
    st.button("Leer necesidad", key="2")

    st.divider()

    st.header("Modelo 1")
    st.text("")
    st.button("Leer necesidad", key="3")

    st.divider()







