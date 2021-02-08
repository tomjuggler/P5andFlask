 
from flask import Flask, render_template, request      
# Reading an animated GIF file using Python Image Processing Library - Pillow

from PIL import Image
from PIL import GifImagePlugin
import requests
import os
from pathlib import Path
import subprocess
# from subprocess import Popen
def changePattern(pattern):
    imageObject = Image.open(requests.get("https://libraryofjuggling.com/JugglingGifs/3balltricks/" + pattern + ".gif", stream=True).raw)
    # Display individual frames from the loaded animated GIF file
    absFilePath = os.path.dirname(os.path.abspath(__file__))
    for frame in range(0,imageObject.n_frames):
        imageObject.seek(frame)
        imageObject.convert("RGBA")
        dir_to_save = Path(absFilePath + "/static/")
        print(dir_to_save)
        fileSave = os.path.join(dir_to_save, f"{pattern}{frame}.gif") #unique name per image pattern frame
        imageObject.save(os.path.join(fileSave))
        #run bash script to change to .jpg and move to correct directory...
        subprocess.Popen(['./convert.sh', fileSave])

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

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def home():
    print(request.method)
    pattern = "box"
    if request.method == 'POST':
        if request.form.get('Cascade') == 'Cascade':
            # pass
            pattern = "cascade"
            changePattern(pattern)
            print("cascade")
        elif  request.form.get('Box') == 'Box':
            # pass # do something else
            pattern = "box"
            changePattern(pattern)
            print("box")
        elif  request.form.get('Statueofliberty') == 'Statueofliberty':
            # pass # do something else
            pattern = "statueofliberty"
            changePattern(pattern)
            print("statueofliberty")
        else:
            # pass # unknown
            changePattern(pattern) #default
            return render_template("index.html")
    elif request.method == 'GET':
        # return render_template("index.html")
        print("No Post Back Call")
    return render_template("index.html", variable=imageObject.n_frames, pattern=pattern)
    
if __name__ == "__main__":
    app.run(debug=True)
