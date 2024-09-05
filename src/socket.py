from flask_socketio import  send, emit
from src.app import socketio
from flask import request

@socketio.on('connect')
def connect():
    print("Sockets Working 🔌")
    # emit('connect', {'data':'Let us learn Web Socket in Flask'})
    return None


@socketio.on('receive_message')
def receive_message(data):
    emit("receive_message", data, broadcast=True)
    return None


@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')


@socketio.on_error_default
def default_error_handler(e):
    print(request.event["message"]) # "my error event"
    print(request.event["args"])    # (data,)