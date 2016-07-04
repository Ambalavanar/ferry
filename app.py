#!/usr/bin/python
from flask import Flask 
from flask import send_from_directory
import os
import json
from datetime import datetime

# This method is patch of datetime JSON serialization
def json_serial(obj):
	if isinstance(obj, datetime):
		serial = obj.isoformat()
		return serial
    	raise TypeError ("Type not serializable")


# Flask REST APIs
app = Flask(__name__, static_url_path='/')

@app.route('/')
@app.route('/home')
@app.route('/index')
@app.route('/UI')
def index():
	return send_from_directory('.', 'index.html')

@app.route('/UI/<path:filename>')
def indexHtml5(filename):
	return send_from_directory('.', 'index.html')
	
@app.route('/views/<path:filename>')
def getView(filename):
	return send_from_directory('./views', filename)

@app.route('/node_modules/<path:filename>')
def getNodeModuleFile(filename):
    return send_from_directory('./node_modules', filename)

@app.route('/js/<path:filename>')
def getJavascriptFile(filename):
    return send_from_directory('./js', filename)

@app.route('/css/<path:filename>')
def getCSSFile(filename):
    return send_from_directory('./css', filename)

@app.route('/imgs/<path:filename>')
def getImgFile(filename):
    return send_from_directory('./imgs', filename)
	
# Start application if this module is run as main module.       
if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	app.run(host='0.0.0.0', port=port)

