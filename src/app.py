
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask, render_template, send_from_directory, jsonify, request
from src import utils as Repo
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_socketio import SocketIO


app = Flask(__name__, template_folder="templates", static_folder="static")
app.config.from_object(Config)

db = SQLAlchemy(app)
socketio = SocketIO(app)
migrate = Migrate(app=app, db=db, render_as_batch=True)

from src import socket


@app.get("/")
def root():
    from src.models import File
    files = File.query.all()
    return render_template('index.html', files=files)


@app.route('/files/<path:file>')
def static_dir(file):
    try:
        return send_from_directory("../files/", file, as_attachment=False)
    except Exception as e:
        print(e)
        return None


@app.post('/api/upload')
def upload():
    try:
        file = request.files['file'] 
        result = Repo.upload_blob(file)
        return jsonify(request.base_url.replace(request.path, "") + result)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 400


@app.post('/api/upload-payload')
def upload_payload():
    try:
        payload = request.json.get("payload")
        return jsonify(payload)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 400
