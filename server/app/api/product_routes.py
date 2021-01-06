from flask import Blueprint
from app.models import Product

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
    pass


@products.route('/<tag>')
def get_products_by_tag():
    pass


@products.route('/<user>')
def get_products_by_user():
    pass


# UPDATE
@products.route('/edit/<id>', methods=["PUT"])
def update_product():
    # also update tags
    pass


# DESTROY
@products.route('/delete/<id>', methods=["POST"])
def delete_product():
    pass
