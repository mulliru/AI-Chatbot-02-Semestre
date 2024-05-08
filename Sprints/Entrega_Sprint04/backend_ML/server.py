# flask, pip install -U flask-cors

from flask import Flask, jsonify, request
from flask_cors import CORS

import numpy as np
import pickle

app = Flask(__name__)
CORS(app) # Permite cross origin

loaded_model = pickle.load(open("amazonia.pkl", "rb"))

@app.route('/')
def index():
  return 'Server Works!'

# expor a função call_predict na rota /call_predict com um método post
@app.route('/call_predict', methods=['POST'])
def call_predict():
    # Recuperando os dados do request como json
    content = request.get_json()

    # Extraindo o campo data
    data = content['data']

    # Convertendo para numpy
    to_predict = np.array(data).reshape(1, -1)

    # Fazendo a predição
    result = loaded_model.predict(to_predict)

    # Retornando a predição
    return jsonify({'prediction':result[0]}) 