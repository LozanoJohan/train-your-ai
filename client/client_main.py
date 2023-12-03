from my_models import my_models
from home import home
import streamlit as st

page_names_to_funcs = {
    "Home": home,
    "Modelos subidos": my_models,
}

demo_name = st.sidebar.selectbox("Seleccionar página", page_names_to_funcs.keys())
page_names_to_funcs[demo_name]()

