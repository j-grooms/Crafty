import boto3
import uuid
import os
from flask import Blueprint, request
from werkzeug.utils import secure_filename
from app.models import db, Product, User, Purchase, Rating
from decimal import Decimal


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
    grand_total = Decimal(body.get('grandTotal'))
    user_id = body.get('user')
    for k, v in quantities.items():
        product = Product.query.get(k)
        product.quantity = product.quantity - v
        previous_purchase = Purchase.query.filter(
            Purchase.user_id == user_id).filter(Purchase.product_id == k
                                                ).first()
        if not previous_purchase:
            purchase = Purchase(user_id=user_id, product_id=k)
            db.session.add(purchase)
        db.session.add(product)
        db.session.commit()
    user = User.query.get(user_id)
    user.money = user.money - grand_total
    db.session.add(user)
    db.session.commit()
    return {"user": user.to_dict()}
    pass


@store.route('/<product_id>/rate', methods=["POST"])
def rate_product(product_id):
    body = request.get_json()
    stars = body.get('rating')
    comment = body.get('comment')
    user_id = body.get('user_id')
    rating = Rating(user_id=user_id, product_id=product_id,
                    rating=stars, comment=comment)
    db.session.add(rating)
    db.session.commit()
    product = Product.query.get(product_id)
    return {"product": product.to_dict()}


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
def update_product_rating(product_id):
    body = request.get_json()
    id = body.get('id')
    rating = Rating.query.get(id)
    if rating:
        rating.rating = body.get('rating')
        rating.comment = body.get('comment')
        db.session.add(rating)
        db.session.commit()
    product = Product.query.get(product_id)
    return {"product": product.to_dict()}


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
    return "Upload Error"
