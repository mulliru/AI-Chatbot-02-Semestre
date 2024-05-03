import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

clf = None
with open("./Entrega_Sprint04/models/fraldinha.pkl", "rb") as file:
    clf = pickle.load(file)
    print("Modelo carregado com sucesso")

@app.route("/")
def index():
    return "tamo on porraaa"

if __name__ == "__main__":
    app.run(debug=True)
