import os
import uuid
import boto3
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask_migrate import Migrate
from flask_cors import CORS
from .models import db
from .seeds import seed_commands
from .config import Config

# UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}

app = Flask(__name__)

db.init_app(app)
Migrate(app, db)
app.cli.add_command(seed_commands)
app.config.from_object(Config)
CORS(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

s3 = boto3.resource('s3',
                    aws_access_key_id=os.environ.get('S3_KEY'),
                    aws_secret_access_key=os.environ.get('S3_SECRET'))


def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['POST'])
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
        split = filename.split(".")
        unique_filename = uuid.uuid4().hex
        split[0] = unique_filename
        file.filename = ".".join(split)
        s3.Bucket('crafty-app').put_object(Key=file.filename, Body=file)
        print(file.filename)
        return "File Uploaded"
        # For saving a local copy
        # target = os.path.join(APP_ROOT, 'uploads')
        # destination = "/".join([target, filename])
        # file.save(destination)
    return "Upload Error"
