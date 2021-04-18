 
from flask import Flask, render_template, request, json, jsonify   
# Reading an animated GIF file using Python Image Processing Library - Pillow

from PIL import Image
from PIL import GifImagePlugin
import requests
import os
from pathlib import Path
import subprocess
import json
from bs4 import BeautifulSoup

# from subprocess import Popen
absFilePath = os.path.dirname(os.path.abspath(__file__))
dir_to_save = Path("/var/www/P5andFlask/static/")
# dir_to_save = Path(absFilePath + "/static/") #local version for tests

#patterns:
threeBall = []
fourBall = []
fiveBall = []
sixBall = []
patternList = []
patternType = ["3balltricks", "4balltricks", "5balltricks", "6balltricks"]
data = {}

try:
    with open(os.path.join(dir_to_save, f"cascade0.png")) as f:
        print(f'file exists')
        #open gif to get number of frames - todo: get number of frames from file system later!
        imageObject = Image.open(requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/cascade.gif", stream=True).raw)
except Exception:
    imageObject = Image.open(requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/cascade.gif", stream=True).raw)
    # Display individual frames from the loaded animated GIF file
    absFilePath = os.path.dirname(os.path.abspath(__file__))
    for frame in range(0,imageObject.n_frames):
        imageObject.seek(frame)
        # dir_to_save = Path(absFilePath + "/static/") #local
        dir_to_save = Path("/var/www/P5andFlask/static/")
        print(dir_to_save)
        fileSave = os.path.join(dir_to_save, f"{frame}.gif")
        imageObject.save(os.path.join(fileSave))
        #run bash script to change to .jpg and move to correct directory...
        # subprocess.Popen(['./convert.sh', fileSave])
        subprocess.Popen(['./var/www/P5andFlask/convert.sh', fileSave])

def getPattern(pat, type):
    right = pat[pat.rfind("/"):]
    left = right[:right.rfind(".")]
    pattern = left.replace("/", "")
    patternList.append(pattern)
    if type == "3balltricks":
        threeBall.append(pattern)
    if type == "4balltricks":
        fourBall.append(pattern)
    if type == "5balltricks":
        fiveBall.append(pattern)
    if type == "6balltricks":
        sixBall.append(pattern)

def allPatternsFromSite():
    url = 'https://libraryofjuggling.com/'
    reqs = requests.get(url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    
    urls = []
    for link in soup.find_all('a'):
        s = link.get('href')
        for a in patternType:
            if a in s:
                getPattern(s, a)
    # print("")
    # print("3: ")
    # print(threeBall)
    # print("")
    # print("4: ")
    # print(fourBall)
    # print("")
    # print("5: ")
    # print(fiveBall)
    # print("")
    # print("6: ")
    # print(sixBall)
    data["threeBall"] = threeBall
    data["fourBall"] = fourBall
    data["fiveBall"] = fiveBall
    data["sixBall"] = sixBall
    # print(data)
    return(data)

def changePattern(pattern):
    try:
        with open(os.path.join(dir_to_save, f"{pattern}0.png")) as f:
            print(f'file exists')
            #open gif to get number of frames - todo: get number of frames from file system later!
            r = requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/" + pattern + ".gif", stream=True).raw
            # if r.status_code == 200:
            # print(r.status_code)
            imageObject = Image.open(r)
            numFrames = imageObject.n_frames
            return numFrames
    except Exception:
        print(f'no file exists, loading...')
        #todo: support 5 ball patterns here /5balltricks/
        # r = requests.get("https://libraryofjuggling.com/JugglingGifs/5balltricks/fiveballsplitmultiplexcascade.gif", stream=True).raw
        r = requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/" + pattern + ".gif", stream=True).raw
        # if r.status_code == 200:
        # print(r.status_code)
        imageObject = Image.open(r)
            # Display individual frames from the loaded animated GIF file
            
        for frame in range(0,imageObject.n_frames):
            imageObject.seek(frame)
            print(f'frame: ')
            print(frame)
            imageObject.convert("RGBA")
            fileSave = os.path.join(dir_to_save, f"{pattern}{frame}.gif") #unique name per image pattern frame
            imageObject.save(os.path.join(fileSave))
            #run bash script to change to .png and move to correct directory...
            process = subprocess.Popen(['./var/www/P5andFlask/convert.sh', fileSave]) #local is ./convert.sh
            process.wait() # is this necessary? 
        numFrames = imageObject.n_frames
        return numFrames
        # print(f'number of frames: ')
        # print(imageObject.n_frames)
        # numFrames = imageObject.n_frames
        # return numFrames



app = Flask(__name__)


#todo: use getLinks.py method to get all 3 ball patterns and send to server as json list
@app.route("/", methods=['GET', 'POST'])
def home():
    # print(request.method)
    pattern = "box"
    frames = 38
    if request.method == 'POST':
        pattern = next(iter(request.form)).lower()
        print("pattern is", pattern)
        print(type(pattern))
        frames = changePattern(pattern)
        # print(f'pattern from form: ')
        # print(pattern)
        # print(f'number of frames: ')
        # print(frames)
        # print(f'pattern after form: ')
        # print(pattern) 
        # allPatterns = allPatternsFromSite() #todo: allPatterns currently only returns 3Ball...
        # # data["threeBall"] = allPatterns
        # data = allPatterns #get all patterns at once!
        # data["threeBall"] = ["Alex", "CherryPicker"]
        # print("data is: ")
        # print(data)
    # return render_template("index.html", variable=frames, pattern="box") #test
    elif request.method == 'GET':
        print("No Post Back Call")
    print(f'pattern from form: ')
    print(pattern)
    print(f'number of frames: ')
    print(frames)
    print(f'pattern after form: ')
    print(pattern) 
    allPatterns = allPatternsFromSite() #todo: allPatterns currently only returns 3Ball...
    # data["threeBall"] = allPatterns
    data = allPatterns #get all patterns at once!
    # data["threeBall"] = ["Alex", "CherryPicker"]
    # print("data is: ")
    # print(data) 
    return render_template("index.html", variable=frames, pattern=pattern, data=data)
    
    
if __name__ == "__main__":
    app.run()
