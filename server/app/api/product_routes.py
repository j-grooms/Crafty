from flask import Blueprint
from app.models import db, Product

products = Blueprint('products', __name__)


# @products.route('/')
# def test():
#     return "Test"

# CREATE
@products.route('/', methods=["POST"])
def create_product():
    # also create tags
    pass


# READ
@products.route('/<id>')
def get_product_by_id(id):
    product_id = id
    product = Product.query.get(product_id)
    return product.to_dict()


@products.route('/all')
def get_all_products():
    products = db.session.query(Product).all()
    return {"products": [product.to_dict() for product in products]}


@products.route('/<tag>')
def get_products_by_tag():
    pass


@products.route('/by_user/<user_id>')
def get_products_by_user(user_id):
    id = user_id
    products = Product.query.filter(Product.sold_by == id).all()
    return {"products": [product.to_dict() for product in products]}


# UPDATE
@products.route('/edit/<id>', methods=["PUT"])
def update_product():
    # also update tags
    pass


# DESTROY
@products.route('/delete/<id>', methods=["POST"])
def delete_product():
    pass
