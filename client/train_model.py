import streamlit as st

st.title("Modelos a entrenar")
st.divider()

st.header("Modelo 1")
st.text("")

col1, col2 = st.columns(2)
with col1:
    st.button("Ver información", key="11")
with col2:
    st.button("¡Quiero entrenar este modelo!", key="12")

python_code = st.file_uploader("Subir modelo entrenado", type=["h5", "pt", "pb", "onnx", "tflite", "model", "pkl"])

st.divider()

st.header("Modelo 1")
st.text("")
st.button("Leer necesidad", key="2")

st.divider()

st.header("Modelo 1")
st.text("")
st.button("Leer necesidad", key="3")

st.divider()







