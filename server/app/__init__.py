import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))


def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            print("req.files not found")
            return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        print("no file to upload")
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        target = os.path.join(APP_ROOT, 'uploads')
        destination = "/".join([target, filename])
        file.save(destination)
        print(APP_ROOT)
        return 'File uploaded'
