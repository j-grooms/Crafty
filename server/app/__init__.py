import os
import uuid
import boto3

from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask_migrate import Migrate
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .seeds import seed_commands
from .config import Config
from .api import products, users, store, auth

# UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.config.from_object(Config)

app.register_blueprint(products, url_prefix='/api/products')
app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(store, url_prefix='/api/store')
app.register_blueprint(auth, url_prefix='/api/auth')

db.init_app(app)
Migrate(app, db)
app.cli.add_command(seed_commands)

CORS(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# to be moved to user creation form
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
        return {"filename": file.filename}
        # For saving a local copy
        # target = os.path.join(APP_ROOT, 'uploads')
        # destination = "/".join([target, filename])
        # file.save(destination)
    return "Upload Error"
