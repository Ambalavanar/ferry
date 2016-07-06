#!/usr/bin/python
import os
import logging
import logging.handlers
import ConfigParser
from datetime import datetime
from flask import Flask
from flask import send_from_directory, request, redirect, make_response
from service.security.api_auth import auth_required, AuthStore


# This method is patch of datetime JSON serialization
def json_serial(obj):
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError("Type not serializable")

# Initialize config reader
config = ConfigParser.ConfigParser()
config.read('conf/app.conf')

# Initialize logger
logger = logging.getLogger('Logger')
logger.setLevel(logging.INFO)
handler = logging.handlers.RotatingFileHandler(config.get('logging', 'file'))
formatter = logging.Formatter("%(asctime)s: %(levelname)s - %(name)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)

# Flask REST APIs
app = Flask(__name__, static_url_path='/')


@app.route('/')
@app.route('/home')
@app.route('/index')
@app.route('/UI')
@auth_required
def index():
    return send_from_directory('.', 'index.html')


@app.route('/login', methods=['GET'])
def login():
    return send_from_directory('.', 'login.html')


@app.route('/loginpost', methods=['POST'])
def login_post():
    try:
        username = None
        password = None
        if 'username' in request.form:
            username = request.form["username"]
        if 'password' in request.form:
            password = request.form["password"]

        if AuthStore().valid_user(username, password):
            response = make_response(redirect('/UI'))
            response.set_cookie("auth-token", str(AuthStore().get_token(username)))
            response.set_cookie("username", str(username))
            return response
    except:
        traceback.print_exc()

    return redirect('/login?status=invalid') #send_from_directory('.', 'login.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    response = make_response(redirect('/login'))
    response.set_cookie("auth-token", "", expires=0)
    response.set_cookie("username", "", expires=0)
    return response


@app.route('/UI/<path:filename>')
@auth_required
def index_html(filename):
    return send_from_directory('.', 'index.html')


@app.route('/views/<path:filename>')
def get_view(filename):
    return send_from_directory('./views', filename)


@app.route('/node_modules/<path:filename>')
def get_node_module(filename):
    return send_from_directory('./node_modules', filename)


@app.route('/js/<path:filename>')
def get_js(filename):
    return send_from_directory('./js', filename)


@app.route('/css/<path:filename>')
def get_css(filename):
    return send_from_directory('./css', filename)


@app.route('/imgs/<path:filename>')
def get_img(filename):
    return send_from_directory('./imgs', filename)


# Start application if this module is run as main module.       
if __name__ == '__main__':
    AuthStore().init()
    app.secret_key = 'ARANN'
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
