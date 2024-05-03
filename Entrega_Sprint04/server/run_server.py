import pickle

clf = None
with open("./Entrega_Sprint04/models/fraldinha.pkl", "rb") as file:
    clf = pickle.load(file)
    print(" Modelo carregado com sucesso")