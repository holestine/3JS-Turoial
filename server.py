"""Flask Server for 3JS Projects"""

#import statistics as stat
from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
#from segment_finder import segment
#import json, os
#from timer import Timer

app = Flask(__name__, template_folder="templates")
#CORS(app)

@app.route("/")
def hello():
    """
    Serves the opening page for the samples
    """
    return render_template('index.htm')

@app.route("/1.htm")
def step_1():
    """
    Serves the opening page for the samples
    """
    return render_template('1.htm')

@app.route("/2.htm")
def step_2():
    """
    Serves the opening page for the samples
    """
    return render_template('2.htm')

@app.route("/3.htm")
def step_3():
    """
    Serves the opening page for the samples
    """
    return render_template('3.htm')

@app.route("/4.htm")
def step_4():
    """
    Serves the opening page for the samples
    """
    return render_template('4.htm')

@app.route("/5.htm")
def step_5():
    """
    Serves the opening page for the samples
    """
    return render_template('5.htm')

@app.route("/Lorenz.htm")
def Lorenz():
    """
    Serves the opening page for the samples
    """
    return render_template('Lorenz.htm')

@app.route('/process', methods=['POST'])
def process():
    """
    Sample for sending data to and receiving data from Flask
    """
    data = request.get_json()
    result = data['value'] * 2
    return jsonify(result=result) # return the result to JavaScript

#@app.route('/segment_image', methods=['POST'])
#def segment_image():
#    # Save file
#    basename = request.files['static_file'].filename
#    os.makedirs('temp', exist_ok=True)
#    filename = 'temp/{}'.format(basename)
#    request.files['static_file'].save(filename)
#
#    # Segment file
#    with Timer("Total_Time"):
#        shape, segments, median = segment(filename)
#
#    Timer().report_phases()
#
#    # Create and return response
#    area_array = [s['area'] for s in segments]
#    response = {"success" : True, 
#			    "shape"   : shape, 
#			    "segments": segments, 
#			    "min_area": min(area_array), 
#			    "max_area": max(area_array),
#			    "median"  : median}
#
#	# Uncomment this to can the data for a demo
#	#os.makedirs('json', exist_ok=True)
#	#with open('static/json/{}.json'.format(basename.split('.')[0]), 'w') as out_file:
#	#	json.dump(response, out_file, sort_keys = True, indent = 4, ensure_ascii = False)
#	
#    response = jsonify(response)
#
#    return response, 200

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host="0.0.0.0", port=8080)
