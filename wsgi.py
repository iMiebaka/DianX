from src.app import socketio, app


if __name__ == "__main__":
    socketio.run(app=app, host="0.0.0.0", port=1221, debug=True)