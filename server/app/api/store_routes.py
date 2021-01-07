from flask import Blueprint, request
from werkzeug.utils import secure_filename
import boto3
import uuid
import os


store = Blueprint('store', __name__)

ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}

s3 = boto3.resource('s3',
                    aws_access_key_id=os.environ.get('S3_KEY'),
                    aws_secret_access_key=os.environ.get('S3_SECRET'))


def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# @store.route('/')
# def test():
#     return "Test"


# CREATE
@store.route('/checkout', methods=["POST"])
def checkout():
    # create purchase entry in db per item
    # empty_cart()
    pass


@store.route('/<product_id>/rate', methods=["POST"])
def rate_product():
    pass


# READ
@store.route('/cart/items')
def get_cart_items():
    # id's from cookie
    # empty the cart
    pass


# UPDATE
@store.route('/cart/add/<id>', methods=["POST"])
def add_to_cart():
    # modify cookie
    pass


@store.route('/cart/remove/<id>', methods=["POST"])
def remove_from_cart():
    # modify cookie
    pass


@store.route('/<product_id>/rate', methods=["PUT"])
def update_product_rating():
    pass


@store.route('/upload', methods=["POST"])
def upload_photo():
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