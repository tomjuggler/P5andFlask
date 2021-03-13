 
from flask import Flask, render_template, request      
# Reading an animated GIF file using Python Image Processing Library - Pillow

from PIL import Image
from PIL import GifImagePlugin
import requests
import os
from pathlib import Path
import subprocess
import json
# from subprocess import Popen
absFilePath = os.path.dirname(os.path.abspath(__file__))
dir_to_save = Path(absFilePath + "/static/")

try:
    with open(os.path.join(dir_to_save, f"cascade0.png")) as f:
        print(f'file exists')
        #open gif to get number of frames - todo: get number of frames from file system later!
        imageObject = Image.open(requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/cascade.gif", stream=True).raw)
except IOError:
    imageObject = Image.open(requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/cascade.gif", stream=True).raw)
    # Display individual frames from the loaded animated GIF file
    absFilePath = os.path.dirname(os.path.abspath(__file__))
    for frame in range(0,imageObject.n_frames):
        imageObject.seek(frame)
        dir_to_save = Path(absFilePath + "/static/")
        print(dir_to_save)
        fileSave = os.path.join(dir_to_save, f"{frame}.gif")
        imageObject.save(os.path.join(fileSave))
        #run bash script to change to .jpg and move to correct directory...
        subprocess.Popen(['./convert.sh', fileSave])

def changePattern(pattern):
    try:
        with open(os.path.join(dir_to_save, f"{pattern}0.png")) as f:
            print(f'file exists')
            #open gif to get number of frames - todo: get number of frames from file system later!
            imageObject = Image.open(requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/" + pattern + ".gif", stream=True).raw)

    except IOError:
        print(f'no file exists, loading...')
        #todo: support 5 ball patterns here /5balltricks/
        imageObject = Image.open(requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/" + pattern + ".gif", stream=True).raw)
            # Display individual frames from the loaded animated GIF file
            
        for frame in range(0,imageObject.n_frames):
            imageObject.seek(frame)
            print(f'frame: ')
            print(frame)
            imageObject.convert("RGBA")
            fileSave = os.path.join(dir_to_save, f"{pattern}{frame}.gif") #unique name per image pattern frame
            imageObject.save(os.path.join(fileSave))
            #run bash script to change to .png and move to correct directory...
            subprocess.Popen(['./convert.sh', fileSave])
    # print(f'number of frames: ')
    # print(imageObject.n_frames)
    numFrames = imageObject.n_frames
    return numFrames



app = Flask(__name__)


#todo: use getLinks.py method to get all 3 ball patterns and send to server as json list
@app.route("/", methods=['GET', 'POST'])
def home():
    # print(request.method)
    pattern = "box"
    frames = 38
    if request.method == 'POST':
        pattern = next(iter(request.form)).lower()
        print(type(pattern))
        frames = changePattern(pattern)
        print(f'pattern from form: ')
        print(pattern)
        print(f'number of frames: ')
        print(frames)
    elif request.method == 'GET':
        print("No Post Back Call")
    print(f'pattern after form: ')
    print(pattern) 
    return render_template("index.html", variable=frames, pattern=pattern)
    # return render_template("index.html", variable=frames, pattern="box") #test
    
if __name__ == "__main__":
    app.run()
