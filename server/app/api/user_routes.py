from flask import Blueprint
from app.models import db, User, Favorite, Purchase
from app.forms import SignUpForm

users = Blueprint('users', __name__)


# @users.route('/')
# def test():
#     return "Test"


# CREATE
@users.route('/', methods=["POST"])
def create_user():
    pass


@users.route('/<id>/favorites/add/<product>', methods=["POST"])
def add_favorite_product():
    pass


# READ
@users.route('/<id>')
def get_user_by_id(id):
    user = User.query.filter(User.id == id).first()
    return {"user": user.to_dict()}


@users.route('/all')
def get_all_users():
    users = db.session.query(User).all()
    return {"users": [user.to_dict() for user in users]}


@users.route('/<id>/favorites')
def get_favorite_products(id):
    products = Favorite.query.filter(Favorite.user_id == id).all()
    return {"favorites": [product.to_dict() for product in products]}


@users.route('/<id>/history')
def get_purchase_history(id):
    products = Purchase.query.filter(Purchase.user_id == id).all()
    return {"purchase_history": [purchase.to_dict() for purchase in products]}


# UPDATE
@users.route('/<id>/edit', methods=["PUT"])
def update_user():
    pass


# DESTROY
@users.route('/<id>/delete', methods=["POST"])
def delete_user():
    pass


@users.route('/<id>/favorites/remove/<product>', methods=["POST"])
def remove_favorite_product():
    pass
