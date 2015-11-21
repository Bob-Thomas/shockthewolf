# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on available packages.
import time
async_mode = None

if async_mode is None:
    try:
        import eventlet
        async_mode = 'eventlet'
    except ImportError:
        pass

    if async_mode is None:
        try:
            from gevent import monkey

            async_mode = 'gevent'
        except ImportError:
            pass

    if async_mode is None:
        async_mode = 'threading'

    print('async_mode is ' + async_mode)

# monkey patching is necessary because this application uses a background
# thread
if async_mode == 'eventlet':
    import eventlet
    eventlet.monkey_patch()
elif async_mode == 'gevent':
    from gevent import monkey

    monkey.patch_all()

import json
from threading import Thread, Event
from flask import Flask, render_template
from flask_socketio import SocketIO
from flask import session, request
from user import User
import eventlet

app = Flask(__name__)
app.config['SECRET_KEY'] = 'spooky'
socketio = SocketIO(app, async_mode=async_mode)
users = []
thread = None


def game_loop():
    with app.test_request_context('/'):
        while True:
            time.sleep(0)
            for user in users:
                if user['position'][0] < 0 or user['position'][0] > user['screen_dimensions'][0]:
                    user['speed'][0] = -user['speed'][0]
                if user['position'][1] < 0 or user['position'][1] > user['screen_dimensions'][1]:
                    user['speed'][1] = -user['speed'][1]
                user['position'][0] += user['speed'][0]
                user['position'][1] += user['speed'][1]
            socketio.emit('update_position', {'users': users})


@app.route('/')
def landing():
    global thread
    # return "kek"
    return render_template("home.html")


@app.route('/partymode')
def partymode():
    return render_template("party_mode.html")


@socketio.on('ping')
def ping(data):
    socketio.emit('pong', data, room=request.sid)

#
# @socketio.on('connect')
# def connect():
#     global thread


@socketio.on('user_connected')
def connected(data):
    global users
    user = User(request.sid, data['username'], data['dimensions'])
    users.append(user)
    socketio.emit('game_joined', {'user': user, 'users': users})


@socketio.on('disconnect')
def disconnected():
    global users
    for user in users:
        if user['id'] == request.sid:
            users.remove(user)
            socketio.emit("user_disconnected", {'user': request.sid})

eventlet.greenthread.spawn(game_loop)

if __name__ == '__main__':
    socketio.run(app)
