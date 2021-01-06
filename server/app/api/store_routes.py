from flask import Blueprint

store = Blueprint('store', __name__)


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
