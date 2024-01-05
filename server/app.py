from flask import Flask, render_template, request, send_file, jsonify
from flask_cors import CORS, cross_origin
import base64
import json
import os

from portfolio import predict

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST', 'GET'])
@cross_origin()
def hello_world():
    return "<h1>hello</h1>"

@app.route('/predict', methods=['POST'])
@cross_origin()
def getPercents():

    data = json.loads(request.data)
    print(data)
    predition = predict(data["start_date"],data["end_date"],data["assets"],data["objective"],data["rm"])
    print(predition)
    return jsonify({'prediction':predition})


if __name__ == "__main__":
    app.run(debug=True)
