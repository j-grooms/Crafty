import boto3
import uuid
import os
from flask import Blueprint, request
from werkzeug.utils import secure_filename
from app.models import Product, User


store = Blueprint('store', __name__)

ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}

s3 = boto3.resource('s3',
                    aws_access_key_id=os.environ.get('S3_KEY'),
                    aws_secret_access_key=os.environ.get('S3_SECRET'))


def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# CREATE
@store.route('/checkout', methods=["POST"])
def checkout():
    body = request.get_json()
    quantities = body.get('quantities')
    grand_total = body.get('grandTotal')
    user = body.get('user')
    for k, v in quantities.items():
        product = Product.query.get(k)
        product.quantity = product.quantity - v
        db.session.add(product)
        db.session.commit()
        
    pass


@store.route('/<product_id>/rate', methods=["POST"])
def rate_product():
    pass


# READ
@store.route('/cart/items', methods=["POST"])
def get_cart_items():
    products = []
    body = request.get_json()
    cart = body.get("cart")
    for item in cart:
        product = Product.query.get(item)
        products.append(product.to_dict())
    print(products)
    return {"products": products}


# UPDATE
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
