 
from flask import Flask, render_template      
# Reading an animated GIF file using Python Image Processing Library - Pillow

from PIL import Image
from PIL import GifImagePlugin
import requests
import os
from pathlib import Path
import subprocess
# from subprocess import Popen

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

@app.route("/")
def home():
    return render_template("index.html", variable=imageObject.n_frames)
    
if __name__ == "__main__":
    app.run(debug=True)
