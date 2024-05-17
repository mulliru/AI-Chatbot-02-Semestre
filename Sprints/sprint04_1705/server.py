# !pip install flask flask_cors requests

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api")
def index():
    return "Server is working!"

@app.route('api/', methods=["POST"])
def predict():
    payload = request.get_json()
    
    print(payload)

    from sklearn.linear_model import LinearRegression
    reg = LinearRegression().fit([[0,0,0],[1,1,1],[0,1]])
    pred = reg.predict(payload['data'])[0]

    return {"pred" : pred}

if __name__ == "__main__":
    app.run(debug=True, port=1234)

